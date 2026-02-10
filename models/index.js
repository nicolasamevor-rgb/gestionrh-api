const Personne = require("./Personnes");
const Conge = require("./Conges");
const Mission = require("./Mission");
const Service = require("./Service");
const RapportMission = require("./RapportMission");
const Notification = require("./Notification");
const Poste = require("./Poste");
const sequelize = require("../config/db");
const Metier = require("./Metiers");
const User = require("./User");

Personne.hasMany(Conge, {
  foreignKey: "PersonneId",
  as: "sesConges",
  onDelete: "CASCADE",
});

Conge.belongsTo(Personne, {
  foreignKey: "PersonneId",
  as: "demandeur",
});

Personne.hasMany(Mission, {
  foreignKey: "ResponsableMissionId",
  as: "sesMission",
  onDelete: "CASCADE",
});

Mission.belongsTo(Personne, {
  foreignKey: "ResponsableMissionId",
  as: "responsable",
});

Personne.hasMany(Mission, {
  foreignKey: "DonneurMissionId",
  as: "MissonsDonnes",
  onDelete: "CASCADE",
});

Mission.belongsTo(Personne, {
  foreignKey: "DonneurMissionId",
  as: "donneur",
});

Service.hasMany(Mission, {
  foreignKey: "ServiceId",
  as: "sesMission",
  onDelete: "CASCADE",
});

Mission.belongsTo(Service, {
  foreignKey: "ServiceId",
  as: "serviceResponsable",
});

Mission.hasOne(RapportMission, {
  foreignKey: "MissionId",
  as: "rapport",
  onDelete: "CASCADE",
});

RapportMission.belongsTo(Mission, {
  foreignKey: "MissionId",
  as: "saMission",
});

Personne.hasMany(Notification, {
  foreignKey: "ExpediteurId",
  as: "expediteur",
  onDelete: "CASCADE",
});

Notification.belongsTo(Personne, {
  foreignKey: "ExpediteurId",
  as: "PersonNotif",
});

Service.hasMany(Notification, {
  foreignKey: "ExpediteurServiceId",
  as: "expediteurService",
  onDelete: "CASCADE",
});

Notification.belongsTo(Service, {
  foreignKey: "ExpediteurId",
  as: "ServiceNotif",
});

Service.hasMany(Poste, {
  foreignKey: "serviceId",
  as: "Postes",
});

Poste.belongsTo(Service, {
  foreignKey: "serviceId",
  as: "ServiceRattachement",
});

Personne.hasOne(Poste, {
  foreignKey: "personneId",
  as: "posteActuel",
});

Poste.belongsTo(Personne, {
  foreignKey: "personneId",
  as: "titulairePoste",
});

Metier.hasMany(Poste, {
  foreignKey: "metierId",
  as: "postesMetier",
});

Poste.belongsTo(Metier, {
  foreignKey: "metierId",
  as: "metier",
});

Service.belongsTo(Personne, {
  foreignKey: "directeurId",
  as: "Directeur", // Alias pour le nommage dans tes requêtes
});

Service.belongsTo(Personne, {
  foreignKey: "adjointId",
  as: "Adjoint",
});

User.belongsTo(Personne, {
  foreignKey: "personneId",
  as: "employe",
});

Personne.hasOne(User, {
  foreignKey: "personneId",
  as: "compte",
});
module.exports = {
  sequelize,
  Personne,
  Conge,
  Mission,
  RapportMission,
  Notification,
  Poste,
  Service,
  Metier,
  User,
};
