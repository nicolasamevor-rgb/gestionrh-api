const express = require("express");
const router = express.Router();
const ServiceCntrl = require("../controllers/ServiceController");

router.post("/", ServiceCntrl.createService);
router.get("/", ServiceCntrl.getAllServices);
router.get("/:id", ServiceCntrl.getServiceById);
router.patch("/:id", ServiceCntrl.updateService);
router.delete("/:id", ServiceCntrl.deleteService);

module.exports = router;
