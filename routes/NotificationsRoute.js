const express = require("express");
const router = express.Router();
const NotificationCntrl = require("../controllers/NotificationController");

router.post("/", NotificationCntrl.createNotification);
router.get("/", NotificationCntrl.getAllNotifications);
router.get("/:id", NotificationCntrl.getNotificationById);
router.patch("/:id", NotificationCntrl.updateNotification);
router.delete("/:id", NotificationCntrl.deleteNotification);

module.exports = router;
