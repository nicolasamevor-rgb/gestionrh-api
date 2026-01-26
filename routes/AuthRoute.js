const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddlewares");
router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Déconnexion réussie" });
});
router.get("/me", authMiddleware, authController.getMe);
module.exports = router;
