const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: console.log,
    define: {
      timestamps: true,
    },
  },
);

const authenticateDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("connexion à mysql réussie");
  } catch (error) {
    console.log("impossible de se connecter à la base de donnée");
  }
};
authenticateDB();

module.exports = sequelize;
