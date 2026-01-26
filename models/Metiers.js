const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Metier = sequelize.define(
  "Metier",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    titre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    competences: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    categorie: {
      type: DataTypes.ENUM("Technique", "Administratif"),
      allowNull: false,
    },

    /*salaireBase: {
      type: DataTypes.FLOAT, // Optionnel, utile pour la gestion RH
      allowNull: true,
    },*/
  },
  { tableName: "metier" }
);
module.exports = Metier;
