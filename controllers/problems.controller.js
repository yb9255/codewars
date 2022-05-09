const problems = require("../models/Problem");

async function addNewProblem() {
  const res = await fetch("./sample_problems");
  const problemDocs = await res.json();

  for (const problemDoc of problemDocs) {
    const newProblem = {
      title: problemDoc.title,
      completedUsers: problemDoc.completed_users,
      difficultyLevel: problemDoc.difficulty_level,
      description: problemDoc.description,
      tests: problemDoc.tests,
    };

    await new problems(newProblem).save();
  }
}

async function getAllProblems () {
  return await problems.find({});
}

async function getProblem (problemId) {
  return await problems.findOne({
    _id: problemId
  });
}

module.exports = {
  addNewProblem,
  getAllProblems,
  getProblem,
};
