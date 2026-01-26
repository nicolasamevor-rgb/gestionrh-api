const { Notification } = require("../models/index");

exports.createNotification = async (req, res) => {
  try {
    const newNotification = await Notification.create(req.body);
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll();
    res.status(200).json(notifications);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getNotificationById = async (req, res) => {
  const { id } = req.params;
  try {
    const notification = await Notification.findByPk(id);
    if (notification) {
      res.status(200).json(notification);
    } else {
      res.status(404).json({ error: "Notification non trouvée" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateNotification = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await Notification.update(req.body, {
      where: { id },
    });
    if (updated) {
      const updatedNotification = await Notification.findByPk(id);
      res.status(200).json(updatedNotification);
    } else {
      res.status(404).json({ error: "Notification non trouvée" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteNotification = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Notification.destroy({
      where: { id },
    });
    if (deleted) {
      res.status(200).json({ message: "Notification archivée avec succès" });
    } else {
      res.status(404).json({ error: "Notification non trouvée" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
