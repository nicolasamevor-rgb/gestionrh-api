const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const Personne = sequelize.define(
  "Personne",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prenoms: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telephone: {
      type: DataTypes.CHAR,
      defaultValue: null,
      allowNull: true,
      unique: true,
    },
    Smatrimoniale: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ContatPrevenir: {
      type: DataTypes.CHAR,
      allowNull: true,
    },
    competences: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "Personne",
    scopes: {
      admins: {
        where: { role: "ADMIN" },
      },
      employes: {
        where: { role: "EMPLOYE" },
      },
    },
  },
);
module.exports = Personne;
