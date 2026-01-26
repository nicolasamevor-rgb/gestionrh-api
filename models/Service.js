const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Service = sequelize.define(
  "Service",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  { tableName: "services", paranoid: true }
);

module.exports = Service;
