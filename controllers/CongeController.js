const { where } = require("sequelize");
const { Conge, Personne } = require("../models/index");

exports.createConge = async (req, res) => {
  try {
    const newConge = await Conge.create({
      ...req.body,
      status: "En attente",
    });
    res.status(201).json(newConge);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllConge = async (req, res) => {
  try {
    const Conges = await Conge.findAll({
      include: [
        {
          model: Personne,
          as: "demandeur",
          attributes: ["nom", "prenoms"],
        },
      ],
    });
    res.status(201).json(Conges);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCongeByPerson = async (req, res) => {
  const { PersonId } = req.params;
  try {
    const Personconges = await Conge.findAll({
      where: {
        PersonId: PersonId,
      },
    });
    res.status(201).json(Personconges);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateConge = async (req, res) => {
  const { id } = req.params;
  const { typeConge, dateDebut, dateFin, motif, status } = req.body;
  try {
    const [updated] = await Conge.update(
      { typeConge, dateDebut, dateFin, motif, status },
      {
        where: {
          id: id,
        },
      },
    );
    if (updated) {
      const updatedConge = await Conge.findByPk(id, {
        include: [
          { model: Personne, as: "demandeur", attributes: ["nom", "prenoms"] },
        ],
      });
      return res.status(201).json(updatedConge);
    }
    throw new Error("Congé non trouvé");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.deleteConge = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Conge.destroy({
      where: {
        id: id,
      },
    });
    if (deleted > 0) {
      return res
        .status(200)
        .json({ id, message: "Congé supprimé avec succès" });
    }
    res.status(404).json({ error: error.message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
