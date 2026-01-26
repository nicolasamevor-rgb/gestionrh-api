const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Mission = sequelize.define(
  "Mission",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    titre: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("Service", "Employé"),
      allowNull: false,
    },
    dateEmission: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    dateDebut: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    dateFin: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    statut: {
      type: DataTypes.ENUM("DEBUT", "EN_COURS", "TERMINE"),
      allowNull: "DEBUT",
    },
    instruction: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
  },
  {
    tableName: "mission",
  }
);
module.exports = Mission;
