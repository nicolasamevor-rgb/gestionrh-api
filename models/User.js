const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "rh", "manager", "employe"),
      defaultValue: "employe",
    },
  },
  { tableName: "users" }
);
module.exports = User;
