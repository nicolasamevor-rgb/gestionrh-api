const express = require("express");
const router = express.Router();
const MissionCntrl = require("../controllers/MissionController");

router.post("/", MissionCntrl.createMission);
router.get("/", MissionCntrl.getAllMissions);
router.get("/:id", MissionCntrl.getMissionById);
router.patch("/:id", MissionCntrl.updateMission);
router.delete("/:id", MissionCntrl.delete);

module.exports = router;
