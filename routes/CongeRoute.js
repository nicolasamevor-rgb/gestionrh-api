const express = require("express");
const router = express.Router();
const CongeCntrl = require("../controllers/CongeController");
const { Conge } = require("../models");

router.post("/", CongeCntrl.createConge);

router.get("/", CongeCntrl.getAllConge);
router.get("/", CongeCntrl.getCongeByPerson);
router.put("/:id", CongeCntrl.updateConge);
router.delete("/:id", CongeCntrl.deleteConge);
module.exports = router;
