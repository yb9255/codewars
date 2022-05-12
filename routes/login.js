const express = require("express");
const passport = require("passport");
const router = express.Router();
const { isLoggedOut } = require("../utils/passport-config")

router.get("/", isLoggedOut, (req, res, next) => {
  res.status(200).render("login/login");
});

router.post("/", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
}));

router.post("/github", passport.authenticate("github", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
}));

module.exports = router;
