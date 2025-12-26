const mongoose = require('mongoose');

async function db() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Error while connecting to database");
    console.error(err);
    process.exit(1); // stop server if DB fails
  }
}

module.exports = { db };
