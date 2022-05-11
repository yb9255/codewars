require("dotenv").config();

const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const ejsLayout = require("express-ejs-layouts");

// passport

const passport = require("passport");
const session = require("express-session");
const localStrategy = require("passport-local").Strategy;
const flash = require("express-flash");
const bcrypt = require("bcrypt");

const index = require("./routes/index");
const login = require("./routes/login");
const register = require("./routes/register");
const User = require("./models/User");

const app = express();

mongoose.connect(process.env.MONGODB_URL);
mongoose.connection.once("open", () => {
  console.log("MongoDB has connected");
});
mongoose.connection.on("error", err => console.log(err));

app.use(ejsLayout);
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views");

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new localStrategy(
    {
      usernameField: "id",
      passwordField: "password",
      session: true,
    },
    (id, password, done) => {
     User.findOne({ id }, (error, user) => {
      if (error) throw error;

      if (!user) {
        return done(null, false, { message: "Incorrect user id", });
      }

      bcrypt.compare(password, user.password, (error, res) => {
        if (error) throw error;

        if (res === false) {
          return done(null, false, { message: "Incorrect password", });
        }

        return done(null, user);
      });
    });
  })
);


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  User.findOne({ id }, (error, user) => {
    done(error, user);
  });
});

app.use("/", index);
app.use("/register", register);
app.use("/login", login);

app.post("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/login");
});

app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  if (process.env.NODE_ENV="development") {
    console.log(err.message);
  }

  res.status(err.status || 500);

  if (err.isInSubmission) {
    res.render("problem/failure", {
      error: err,
    })
  } else {
    res.render("error", {
      error: err,
    });
  }
});

module.exports = app;
