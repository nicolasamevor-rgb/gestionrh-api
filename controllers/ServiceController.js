const { Service, Poste, Metier, Personne } = require("../models/index");

exports.createService = async (req, res) => {
  try {
    const newService = await Service.create(req.body);
    res.status(201).json(newService);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll({
      include: [
        { model: Personne, as: "Directeur", attributes: ["nom", "prenoms"] },
        { model: Personne, as: "Adjoint", attributes: ["nom", "prenoms"] },

        {
          model: Poste,
          as: "Postes",
          include: [
            { model: Metier, as: "metier", attributes: ["titre"] },

            {
              model: Personne,
              as: "titulairePoste",
              attributes: ["nom", "prenoms"],
            },
          ],
        },
      ],
    });

    res.status(200).json(services);
  } catch (error) {
    console.error("Détail de l'erreur :", error);
    res.status(500).json({ message: "Erreur lors de la récupération", error });
  }
};

exports.getServiceById = async (req, res) => {
  const { id } = req.params;
  try {
    const service = await Service.findByPk(id);
    if (service) {
      res.status(200).json(service);
    } else {
      res.status(404).json({ error: "Service non trouvé" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateService = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await Service.update(req.body, {
      where: { id },
    });
    if (updated) {
      const updatedService = await Service.findByPk(id);
      res.status(200).json(updatedService);
    } else {
      res.status(404).json({ error: "Service non trouvé" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteService = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Service.destroy({
      where: { id },
    });
    if (deleted) {
      res.status(200).json({ message: "Service supprimé avec succès" });
    } else {
      res.status(404).json({ error: "Service non trouvé" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
