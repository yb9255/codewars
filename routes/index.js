const express = require("express");
const CustomError = require("../utils/CustomError");
const { VM } = require('vm2');
const { ERROR_IS_IN_SUBMISSION } = require("../utils/config");

const {
  getAllProblems,
  getProblem,
} = require("../controllers/problems.controller");

const {
  isLoggedIn
} = require("../utils/passport-config");

const router = express.Router();

router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const problems = await getAllProblems();

    res.status(200).render("index", {
      problems,
    });
  } catch (error) {
    next(new CustomError(error, 404));
  }
});

router.get("/problems/:problem_id", isLoggedIn, async (req, res, next) => {
  try {
    const problemId = req.params.problem_id;
    const problem = await getProblem(problemId);

    console.log(problem.paramName);

    res.status(200).render("problem/problem", {
      problem,
    });
  } catch (error) {
    next(new CustomError(error, 404));
  }
});

router.post("/problems/:problem_id", isLoggedIn, async (req, res, next) => {
  try {
    const problemId = req.params.problem_id;
    const enteredCode = req.body["code-mirror"];
    const tests = (await getProblem(problemId)).tests;
    const vm = new VM();

    let isPassed;
    let failCase;
    let wrongAnswer;
    let rightAnswer;

    for (const test of tests) {
      let userSubmission = vm.run(`${enteredCode} ${test.code}`);

      if (test.solution === userSubmission) {
        isPassed = true;
      } else {
        isPassed = false;
        failCase = test.code;
        wrongAnswer = `${userSubmission}`;
        rightAnswer = test.solution;
        break;
      }
    }

    if (isPassed) {
      res.status(200).render("problem/success");
    } else {
      res.status(200).render("problem/failure", {
        failCase,
        wrongAnswer,
        rightAnswer,
        error: null,
      });
    }
  } catch (error) {
    next(new CustomError(error, 400, ERROR_IS_IN_SUBMISSION));
  }
});

module.exports = router;
