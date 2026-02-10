const express = require("express");
const router = express.Router();
const MetierController = require("../controllers/MetierController");

router.post("/", MetierController.createMetier);

router.get("/", MetierController.getAllMetiers);

module.exports = router;
