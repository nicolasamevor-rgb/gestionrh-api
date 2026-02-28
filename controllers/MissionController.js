const { where } = require("sequelize");
const {
  Mission,
  Service,
  Personne,
  RapportMission,
} = require("../models/index");

exports.createMission = async (req, res) => {
  try {
    const newMission = await Mission.create({ ...req.body, statut: "DEBUT" });
    res.status(201).json(newMission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllMissions = async (req, res) => {
  try {
    const missions = await Mission.findAll({
      include: [
        {
          model: Service,
          as: "serviceResponsable",
          attributes: ["nom"],
        },
        {
          model: Personne,
          as: "responsable",
          attributes: ["nom", "prenoms"],
        },
        {
          model: RapportMission,
          as: "rapport",
        },
      ],
    });
    res.status(201).json(missions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMissionById = async (req, res) => {
  const { id } = req.params;
  try {
    const mission = await Mission.findByPk(id);
    res.status(201).json(mission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateMission = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await Mission.update(req.body, {
      where: {
        id: id,
      },
    });
    if (updated) {
      const updatedMission = await Mission.findByPk(id);
      res.status(201).json(updatedMission);
    }
    throw new Error("Mission non trouvée");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const [deleted] = await Mission.destroy({ where: { id: id } });
    if (deleted) {
      res.status(201).json({ message: "Mission supprimée" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
