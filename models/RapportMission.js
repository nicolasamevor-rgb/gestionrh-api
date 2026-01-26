const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const RapportMission = sequelize.define(
  "RapportMission",
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
    dateRapport: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    contenu: {
      type: DataTypes.TEXT,
    },
    commentaire: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    fichierUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "rapportMission",
    paranoid: true,
  }
);
module.exports = RapportMission;
