import User from '../models/User';
import Notification from '../models/Notification';

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

    const notifications = await Notification.findAll({
      where: {
        user_id: req.userId,
      },
      order: [['updatedAt', 'DESC']],
      limit: 20,
    });

    return res.json(notifications);
  }
}

export default new NotificationController();
