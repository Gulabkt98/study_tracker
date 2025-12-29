const express = require("express");
const router = express.Router();
const {createStudy,getstudies,deletestudies,updatestudy} = require("../controllers/createStudy");
const {authmiddleware} = require("../middleware/authmiddleware");

router.post("/createstudy", authmiddleware,createStudy);
router.get("/getstudies",authmiddleware,getstudies);
router.delete("/delete/:id", authmiddleware, deletestudies);
router.put("/update/:id",authmiddleware,updatestudy);

module.exports = router;

