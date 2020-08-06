import { format, parseISO } from 'date-fns';
import Mail from '../../lib/Mail';

class MailCancellation {
  // Unique job key
  get key() {
    return 'MailCancellation';
  }

  // Job task
  async handle({ data }) {
    const { appointment } = data;

    await Mail.sendMail({
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: 'Appointment cancellation',
      template: 'appointment-cancellation',
      context: {
        provider: appointment.provider['name'],
        user: appointment.user.name,
        date: format(
          parseISO(appointment.date),
          "MMMM dd '('EEEE')', 'at' H:mm a"
        ),
      },
    });

    console.log(
      `Appointment cancellation email sent to '${appointment.provider.email}'.`
    );
  }
}

export default new MailCancellation();
