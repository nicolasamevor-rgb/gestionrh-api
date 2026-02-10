const { Poste, Personne, Metier } = require("../models/index");

exports.createPoste = async (req, res) => {
  try {
    const newPoste = await Poste.create(req.body);
    res.status(201).json(newPoste);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllPostes = async (req, res) => {
  try {
    const postes = await Poste.findAll({
      include: [
        {
          model: Personne,
          as: "titulairePoste",
          attributes: ["id", "nom", "prenoms"],
        },
        {
          model: Metier,
          as: "metier",
        },
      ],
    });
    res.status(200).json(postes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPosteById = async (req, res) => {
  const { id } = req.params;
  try {
    const poste = await Poste.findByPk(id);
    if (poste) {
      res.status(200).json(poste);
    } else {
      res.status(404).json({ error: "Poste non trouvé" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updatePoste = async (req, res) => {
  const { id } = req.params;
  const {
    createdAt,
    updatedAt,
    id: bodyId,
    metier,
    titulairePoste,
    ...dataToUpdate
  } = req.body;
  try {
    const [updated] = await Poste.update(dataToUpdate, {
      where: { id },
    });
    if (updated) {
      const updatedPoste = await Poste.findByPk(id, {
        include: [
          { model: Personne, as: "titulairePoste" },
          { model: Metier, as: "metier" },
        ],
      });
      res.status(200).json(updatedPoste);
    } else {
      res.status(404).json({ error: "Poste non trouvé" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletePoste = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Poste.destroy({
      where: { id },
    });
    if (deleted) {
      res.status(200).json({ message: "Poste supprimé avec succès" });
    } else {
      res.status(404).json({ error: "Poste non trouvé" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
