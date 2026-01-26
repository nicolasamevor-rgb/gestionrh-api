const { RapportMission } = require("../models/index");

exports.createRapportMission = async (req, res) => {
  try {
    const newRapportMission = await RapportMission.create(req.body);
    res.status(201).json(newRapportMission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllRapportMissions = async (req, res) => {
  try {
    const rapportMissions = await RapportMission.findAll();
    res.status(200).json(rapportMissions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getRapportMissionById = async (req, res) => {
  const { id } = req.params;
  try {
    const rapportMission = await RapportMission.findByPk(id);
    if (rapportMission) {
      res.status(200).json(rapportMission);
    } else {
      res.status(404).json({ error: "Rapport de mission non trouvé" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateRapportMission = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await RapportMission.update(req.body, {
      where: { id },
    });
    if (updated) {
      const updatedRapportMission = await RapportMission.findByPk(id);
      res.status(200).json(updatedRapportMission);
    } else {
      res.status(404).json({ error: "Rapport de mission non trouvé" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteRapportMission = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await RapportMission.destroy({
      where: { id },
    });
    if (deleted) {
      res
        .status(200)
        .json({ message: "Rapport de mission supprimé avec succès" });
    } else {
      res.status(404).json({ error: "Rapport de mission non trouvé" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
