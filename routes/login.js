const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).render("login", {
    title: "login",
  });
});

router.post("/normal-login", (req, res, next) => {
  const { id, password } = req.body;
  console.log(id, password);

  res.send("normal login");
});

router.post("/social-login", (req, res, next) => {
  try {
    console.log("social login");
    res.send("!");
  } catch {
    next({
      error: "error",
    })
  }
});

module.exports = router;
