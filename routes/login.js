const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/", (req, res, next) => {
  try {
    res.status(200).render("login", {
      title: "login",
    });
  } catch(error) {
    console.log(error.message);
  }
});

router.post("/normal-login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
}));

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
