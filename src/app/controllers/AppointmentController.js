import Appointment from '../models/Appointment';
import { startOfHour, parseISO, isBefore, format } from 'date-fns';
import * as Yup from 'yup';
import User from '../models/User';
import File from '../models/File';
import Notification from '../models/Notification';

class AppointmentController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const appointments = await Appointment.findAll({
      where: { user_id: req.userId, canceled_at: null },
      limit: 20,
      offset: (page - 1) * 20,
      order: ['date'],
      attributes: ['id', 'date'],
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });

    return res.json(appointments);
  }
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

    // Users shouldn't create appointments with themselves
    if (req.userId == provider_id) {
      return res.status(401).json({
        error:
          "User can't create appointments with themself (provider_id is equal to user's id",
      });
    }

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

    // Notify provider appointment
    const user = await User.findByPk(req.userId);
    const formattedDate = format(hourStart, "MMMM dd '('EEEE')', 'at' H:mm a");

    console.log(provider_id);
    await Notification.create({
      user_id: provider_id,
      content: `New appointment for ${user.name} on ${formattedDate}`,
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
