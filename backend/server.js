
const express=require("express");
const app = express();

require('dotenv').config();

const dbconnect = require("./config/db");
dbconnect.db()

app.get('/', (req, res) => {
  res.send("API running");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});