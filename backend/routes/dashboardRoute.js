const {dashboard}=require("../controllers/dashboard");
const express = require("express");
const router = express.Router();

router.get("/",dashboard);

module.exports=router;