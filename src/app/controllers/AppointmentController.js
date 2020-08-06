require('dotenv/config');

import Appointment from '../models/Appointment';
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
import * as Yup from 'yup';
import User from '../models/User';
import File from '../models/File';
import Notification from '../models/Notification';

import Queue from '../../lib/Queue';
import MailCancellation from '../jobs/MailCancellation';
import Mail from '../../lib/Mail';

class AppointmentController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const appointments = await Appointment.findAll({
      where: { canceled_at: null },
      limit: 20,
      offset: (page - 1) * 20,
      order: ['date'],
      attributes: ['id', 'date', 'past', 'cancelable'],
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          where: { id: req.userId }, // Appointment must be assigned to the logged in Provider
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

    // Check if appointment is set to a past date
    if (isBefore(hourStart, new Date())) {
      return res
        .status(400)
        .json({ error: "Appointment can't have past dates" });
    }

    // Check if provider is available for the given date
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

    await Notification.create({
      user_id: provider_id,
      content: `New appointment with ${user.name} on ${formattedDate}`,
    });

    return res.json(appointment);
  }
  async delete(req, res) {
    const appointment = await Appointment.findByPk(req.params.appointmentId, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email'],
        },
      ],
    });

    // Preliminary checks regarding appointments
    if (!appointment) {
      return res.status(400).json({
        error: "Appointment doesn't exist",
      });
    } else if (appointment.canceled_at) {
      return res.status(400).json({
        error: 'Appointment is already canceled',
      });
    } else if (appointment.user_id !== req.userId) {
      return res.status(401).json({
        error:
          "You aren't allowed to cancel this appointment (user deleting appointment didn't create it)",
      });
    }

    const subtractedHours = subHours(appointment.date, 2);

    // Check if user is cancelling appointment at least 2 hours in the future
    if (isBefore(subtractedHours, new Date())) {
      return res.status(401).json({
        error: 'You can only cancel appointments 2 hours in advance',
      });
    }

    // Mark appointment as canceled and save in db
    appointment.canceled_at = new Date();
    await appointment.save();

    console.log('ovo manda email');

    for (let i = 0; i < 10; i++) {
      try {
        await Mail.sendMail({
          from: process.env.MAIL_USERNAME,
          to: `${appointment.provider.name} <${appointment.provider.email}>`,
          subject: 'Appointment cancellation',
          template: 'appointment-cancellation',
          context: {
            provider: 'fds',
            user: 'fds',
            date: undefined,
          },
        });
      } catch (err) {
        console.log(err);
      }
    }

    console.log('mandei??');

    await Queue.add(MailCancellation.key, {
      appointment,
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
