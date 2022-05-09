const mongoose = require("mongoose");

/*

  TODO: Fill in the model specification

 */
const ProblemSchema = new mongoose.Schema({
  title: String,
  completedUsers: Number,
  difficultyLevel: Number,
  description: String,
  tests: [Object],
});

module.exports = mongoose.model("Problem", ProblemSchema);
