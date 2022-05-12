const User = require("../models/User");
const bcrypt = require("bcrypt");

function getLocalStrategy (id, password, done) {
  User.findOne({ id }, (error, user) => {
    if (error) {
      done(new CustomError(error, 500));
    }

    if (!user) {
      return done(null, false, { message: "Incorrect user id", });
    }

    bcrypt.compare(password, user.password, (error, res) => {
      if (error) {
        return done(error);
      }

      if (res === false) {
        return done(null, false, { message: "Incorrect password", });
      }

      return done(null, user);
    });
  });
}

function isLoggedIn (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  };

  res.redirect("/login");
}

function isLoggedOut (req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  };

  res.redirect("/");
}

module.exports = {
  getLocalStrategy,
  isLoggedIn,
  isLoggedOut,
};
