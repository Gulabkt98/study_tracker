const express = require("express");
const router = express.Router();
const {createStudy,getstudies} = require("../controllers/createStudy");
const {authmiddleware} = require("../middleware/authmiddleware");

router.post("/createstudy", authmiddleware,createStudy);
router.get("/getstudies",authmiddleware,getstudies);
module.exports = router;

