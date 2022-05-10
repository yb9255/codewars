const mongoose = require("mongoose");

/*

  TODO: Fill in the model specification

 */
const userSchema = new mongoose.Schema({
  userId: String,
  password: String,
});

module.exports = mongoose.model("User", userSchema);
