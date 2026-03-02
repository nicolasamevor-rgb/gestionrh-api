const cron = require("node-cron");
const { Conge, Personne, sequelize } = require("../models/index");
const { Op } = require("sequelize");

const initCronJobs = () => {
  cron.schedule("01 00 * * *", async () => {
    console.log("VERIFICATION JOURNALIERS DES CONGES");
    try {
      const today = new Date().toISOString().split("T")[0];
      await Personne.Update({ isActive: 1 }, { where: {} });

      const activeConges = await Conge.findAll({
        attributes: ["PersonneId"],
        where: {
          status: "Approuvé",
          dateDebut: { [Op.lte]: today },
          dateFin: { [Op.gte]: today },
        },
      });
      const personneIdsEnConges = [
        ...new Set(activeConges.map((c) => c.PersonneId)),
      ];
      if (personneIdsEnConges.length > 0) {
        await Personne.update(
          { isActive: 0 },
          {
            where: {
              id: { [Op.in]: personneIdsEnConges },
            },
          },
        );
      }
      console.log("Vérification des congés terminées");
    } catch (error) {
      console.error("Erreur lors de la vérification des congés :", error);
    }
  });
};
module.exports = { initCronJobs };
