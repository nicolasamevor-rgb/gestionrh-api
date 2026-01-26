const express = require("express");
const router = express.Router();
const PostCntrl = require("../controllers/PosteController");

router.post("/", PostCntrl.createPoste);
router.get("/", PostCntrl.getAllPostes);
router.get("/:id", PostCntrl.getPosteById);
router.patch("/:id", PostCntrl.updatePoste);
router.delete("/:id", PostCntrl.deletePoste);

module.exports = router;
