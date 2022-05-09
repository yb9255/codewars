const express = require("express");
const router = express.Router();
const {
  getAllProblems,
  getProblem,
} = require("../controllers/problems.controller");

router.get("/", async (req, res, next) => {
  const problems = await getAllProblems();

  res.render("index", {
    problems,
  });
});

router.get("/problems/:problem_id", async (req, res, next) => {
  const problemId = req.params.problem_id;
  const problem = await getProblem(problemId);

  res.render("problem/problem", {
    problem,
  });
});

router.post("/problems/:problem_id", async (req, res, next) => {
  const code = req.body["code-mirror"];
  console.log(code)
});

module.exports = router;
