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
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
);

const connectWithRetry = async (retries = 10, delay = 5000) => {
  try {
    await sequelize.authenticate();
    console.log("connexion à mysql réussie");
    return true;
  } catch (error) {
    console.log(
      "impossible de se connecter à la base de donnée, nouvelle tentative...",
      error.message,
    );
    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      return connectWithRetry(retries - 1, delay);
    } else {
      console.error(
        "Échec de la connexion après plusieurs tentatives, arrêt de l'application",
      );
      throw error;
    }
  }
};

// export the sequelize instance itself for backwards compatibility
// and attach the retry helper as a property so models that `require` the
// module still get the Sequelize instance.
module.exports = sequelize;
module.exports.connectWithRetry = connectWithRetry;
