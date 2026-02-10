const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Poste = sequelize.define(
  "Poste",
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
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    /*salaireBase: {
      type: DataTypes.FLOAT, // Optionnel, utile pour la gestion RH
      allowNull: true,
    },*/
    personneId: {
      type: DataTypes.UUID,
      allowNull: true,
      unique: true,
      references: {
        model: "Personne",
        key: "id",
      },
    },
  },
  { tableName: "postes", paranoid: true },
);
module.exports = Poste;
