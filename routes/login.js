const express = require("express");
const passport = require("passport");
const router = express.Router();
const { isLoggedOut } = require("../utils/passport-config")

router.get("/", isLoggedOut, (req, res, next) => {
  res.status(200).render("login", {
    title: "login",
  });
});

router.post("/", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/register",
  failureMessage: true,
}));

module.exports = router;
