import Appointment from '../models/Appointment';
import { startOfHour, parseISO, isBefore } from 'date-fns';
import * as Yup from 'yup';
import User from '../models/User';

class AppointmentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    });

    await schema.validate(req.body, { abortEarly: false }).catch((errors) => {
      return res
        .status(400)
        .json({ error: `Validation failed: ${errors['errors']}` });
    });

    const { provider_id, date } = req.body;

    // Check if user with provider_id is a provider
    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!isProvider) {
      return res.status(401).json({
        error:
          "You can only create appointments with providers (provider_id doesn't belong to a provider)",
      });
    }

    const hourStart = startOfHour(parseISO(date));
    console.log(date);
    console.log(hourStart);

    // Check if appointment is set to a past date
    if (isBefore(hourStart, new Date())) {
      return res
        .status(400)
        .json({ error: "Appointment can't have past dates" });
    }

    // Check date availability
    const checkExistingAppointment = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    });

    if (checkExistingAppointment) {
      return res
        .status(400)
        .json({ error: 'Appointment date is not available' });
    }

    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date: hourStart,
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
