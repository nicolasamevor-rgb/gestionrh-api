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
      allowNull: false,
      unique: true,
    },
    Smatrimoniale: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ContatPrevenir: {
      type: DataTypes.CHAR,
      allowNull: false,
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
