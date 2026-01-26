const { Poste } = require("../models/index");

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
    const postes = await Poste.findAll();
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
  try {
    const [updated] = await Poste.update(req.body, {
      where: { id },
    });
    if (updated) {
      const updatedPoste = await Poste.findByPk(id);
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
