const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");
const { toDefaultValue } = require("sequelize/lib/utils");

Conge = sequelize.define(
  "Conge",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    typeConge: {
      type: DataTypes.ENUM(
        "PAYE",
        "RTT",
        "MALADIE",
        "SANS_SOLDE",
        "EXCEPTIONNEL"
      ),
      allowNull: false,
    },
    dateDemande: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    motif: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    dateDebut: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dateFin: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    motifRefus: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
  },
  { tableName: "conges", paranoid: true }
);

module.exports = Conge;
