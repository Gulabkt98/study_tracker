const express = require("express");
const router = express.Router();
const {createStudy} = require("../controllers/createStudy");
const {authmiddleware} = require("../middleware/authmiddleware");

router.post("/createstudy", authmiddleware,createStudy);
module.exports = router;

