// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  {
    collection: "userdetails", // Specify the collection name explicitly
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
