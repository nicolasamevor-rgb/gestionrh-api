const { Poste, Service, Personne, Metier, sequelize } = require("../models");

exports.getstats = async (req, res) => {
  try {
    const servicesStats = await Service.findAll({
      attributes: ["nom"],
      include: [
        {
          model: Poste,
          as: "Postes",
          include: [
            {
              model: Personne,
              as: "titulairePoste",
              attributes: ["isActive"],
            },
          ],
        },
      ],
    });

    const dataServices = servicesStats.map((s) => {
      const postes = s.Postes || [];
      return {
        name: s.nom,
        actifs: postes.filter(
          (p) => p.titulairePoste && p.titulairePoste.isActive,
        ).length,
        inactifs: postes.filter(
          (p) => p.titulairePoste && !p.titulairePoste.isActive,
        ).length,
      };
    });

    const MetiersStats = await Metier.findAll({
      attributes: ["titre"],
      include: [
        {
          model: Poste,
          as: "postesMetier",
          attributes: [],
        },
      ],

      attributes: {
        include: [
          [
            sequelize.fn("COUNT", sequelize.col("postesMetier.id")),
            "nombrePostes",
          ],
        ],
      },
      group: ["Metier.id", "Metier.titre"],
    });

    const dataMetiers = MetiersStats.map((m) => {
      return {
        name: m.titre,
        value: parseInt(m.dataValues.nombrePostes) || 0,
      };
    });

    res.status(200).json({
      services: dataServices,
      metiers: dataMetiers,
    });
  } catch (error) {
    console.error("Détail de l'erreur Stats:", error);
    res.status(500).json({
      message: "Erreur lors de la génération des statistiques",
      details: error.message,
    });
  }
};
