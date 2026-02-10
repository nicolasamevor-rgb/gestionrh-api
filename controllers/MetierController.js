const { Metier } = require("../models/index");

// Create a new Metier
exports.createMetier = async (req, res) => {
  try {
    const newMetier = await Metier.create(req.body);
    res.status(201).json(newMetier);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllMetiers = async (req, res) => {
  try {
    const metiers = await Metier.findAll();
    res.status(200).json(metiers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
