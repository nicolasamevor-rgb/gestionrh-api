const express = require("express");
const router = express.Router();
const RapportMissionCntrl = require("../controllers/RapportMissionController");

router.post("/", RapportMissionCntrl.createRapportMission);
router.get("/", RapportMissionCntrl.getAllRapportMissions);
router.get("/:id", RapportMissionCntrl.getRapportMissionById);
router.patch("/:id", RapportMissionCntrl.updateRapportMission);
router.delete("/:id", RapportMissionCntrl.deleteRapportMission);

module.exports = router;
