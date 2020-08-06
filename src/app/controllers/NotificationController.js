import User from '../models/User';
import Notification from '../models/Notification';
import * as Yup from 'yup';

class NotificationController {
  async index(req, res) {
    const isProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!isProvider) {
      return res.status(401).json({
        error:
          "Only providers can read notifications (provider_id doesn't belong to a provider)",
      });
    }

    const whereStatement = { user_id: req.userId };
    // if (req.query.excludePast) {
    //   const past = !req.query.excludePast;
    // }

    const notifications = await Notification.findAll({
      where: whereStatement,
      order: [['updatedAt', 'DESC']],
      limit: 20,
    });

    return res.json(notifications);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      read: Yup.boolean(),
      content: Yup.string(),
    });

    await schema.validate(req.body, { abortEarly: false }).catch((errors) => {
      return res
        .status(400)
        .json({ error: `Validation failed: ${errors['errors']}` });
    });

    const { read, content } = req.body;
    console.log(read, content);

    console.log(req.params.notificationId);
    const notification = await Notification.findByPk(req.params.notificationId);

    notification.read = read;
    notification.content = content;

    await notification.update(req.body);

    return res.json(notification);
  }
}

export default new NotificationController();
