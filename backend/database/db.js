const mongoose = require("mongoose");
require("dotenv").config();

async function connect() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log(">>> Connect to mongodb successed");
  } catch (error) {
    console.log(">>> Connect mongodb failed");
  }
}

module.exports = connect;
