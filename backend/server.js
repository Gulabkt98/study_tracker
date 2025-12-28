
const express=require("express");
const cookieParser = require("cookie-parser");
const app = express();

require('dotenv').config();

const PORT =process.env.PORT || 3000;

const dbconnect = require("./config/db");
dbconnect.db()

// middlewares
app.use(express.json());       // parse JSON body
app.use(cookieParser());       // parse cookies

///auth routes  
const authRoute = require("./routes/authRoutes");
const studyRoute = require("./routes/StudyRoutes");

//routes mountesss
app.use("/api/v1/auth",authRoute);
app.use("/api/v1/study",studyRoute);

app.get('/', (req, res) => {
  res.send("API running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
