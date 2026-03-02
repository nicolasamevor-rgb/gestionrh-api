const express = require("express");
const multer = require("multer");
const router = express.Router();
const RapportMissionCntrl = require("../controllers/RapportMissionController");
const upload = multer({
    storage : multer.memoryStorage(),
    limits : {fileSize : 2 * 1024 * 1024}
})

router.post("/", upload.single("rapportFile"), RapportMissionCntrl.createRapportMission);
router.get("/", RapportMissionCntrl.getAllRapportMissions);
router.get("/:id", RapportMissionCntrl.getRapportMissionById);
router.patch("/:id", RapportMissionCntrl.updateRapportMission);
router.delete("/:id", RapportMissionCntrl.deleteRapportMission);

module.exports = router;
