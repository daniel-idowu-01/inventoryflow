const mongoose = require("mongoose");

require("dotenv").config();
const uri = process.env.DATABASE_URL;

function connectDB() {
  mongoose
    .connect(uri)
    .then(() => {
      console.log("Connection Successful!");
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
}

module.exports = { connectDB };
