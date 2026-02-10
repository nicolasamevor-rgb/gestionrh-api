require("dotenv").config();
const cors = require("cors");
const { sequelize, User, Personne } = require("./models/index.js");
const express = require("express");
const cookieParser = require("cookie-parser");
const http = require("http");
const { Sequelize } = require("sequelize");
const { Server } = require("socket.io");
const EmployeRoute = require("./routes/EmployeRoute.js");
const CongeRoute = require("./routes/CongeRoute.js");
const MissionRoute = require("./routes/MissionRoute.js");
const NotificationRoute = require("./routes/NotificationsRoute.js");
const PosteRoute = require("./routes/PosteRoute.js");
const RapportMissionRoute = require("./routes/RapportMissionRoute.js");
const ServiceRoute = require("./routes/ServiceRoute.js");
const MetierRoute = require("./routes/MetierRoute.js");
const AuthRoute = require("./routes/AuthRoute.js");

//création des serveurs

const app = express();
const server = http.createServer(app);
// 1. Définir les options CORS une seule fois pour éviter les erreurs
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// 2. Utilisation des middlewares (L'ORDRE EST CRUCIAL)
app.use(cors(corsOptions)); // <-- On applique les options ici !
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// 3. Appliquer aussi à Socket.io
const io = new Server(server, {
  cors: corsOptions,
});
io.on("connection", (socket) => {
  console.log("un nouvel utulisateur est connecté", socket.id);
  socket.on("join", (data) => {
    socket.join(`user_${data.userId}`);
    if (data.serviceId) {
      socket.join(`service_${data.serviceId}`);
    }
  });
  socket.on("disconnect", () => {
    console.log("Utilisateur Déconnecté");
  });
});
app.use("/api/auth", AuthRoute);
app.use("/api/employes", EmployeRoute);
app.use("/api/conges", CongeRoute);
app.use("/api/missions", MissionRoute);
app.use("/api/notifications", NotificationRoute);
app.use("/api/postes", PosteRoute);
app.use("/api/services", ServiceRoute);
app.use("/api/rapports/missions", RapportMissionRoute);
app.use("/api/metiers", MetierRoute);

//Demarrage avec la base de donnée
const PORT = process.env.PORT || 5000;
sequelize
  .sync({ alter: true })
  .then(async () => {
    server.listen(PORT, () => {
      console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Erreur de synchronisation DB:", err);
  });
// Script de migration rapide
