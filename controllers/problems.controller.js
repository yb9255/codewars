const problems = require("../models/Problem");

async function getAllProblems () {
  return await problems.find({});
}

async function getProblem (problemId) {
  return await problems.findOne({
    _id: problemId
  });
}

module.exports = {
  getAllProblems,
  getProblem,
};
