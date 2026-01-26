const express = require("express");
const router = express.Router();
const EmployeCntrl = require("../controllers/EmployeController");

router.get("/", EmployeCntrl.getAllEmploye);

router.post("/", EmployeCntrl.createEmploye);

router.get("/:id", EmployeCntrl.getEmployeById);
router.put("/:id", EmployeCntrl.updateEmploye);

router.get("/:id/pdf", EmployeCntrl.createficheEmploye);

module.exports = router;
