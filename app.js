require("dotenv").config();

const path = require("path");
const express = require("express");
const ejsLayout = require("express-ejs-layouts");
const morgan = require("morgan");
const { connectDB } = require("./utils/mongoose");

// passport related modules start

const passport = require("passport");
const session = require("express-session");
const flash = require("express-flash");
const LocalStrategy = require("passport-local").Strategy;
const {
  getLocalStrategy,
} = require("./utils/passport-config");

// passport related modules end

const index = require("./routes/index");
const login = require("./routes/login");
const register = require("./routes/register");

const app = express();

connectDB();

app.use(ejsLayout);
app.use(flash());

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "id",
      passwordField: "password",
      session: true,
    },
    getLocalStrategy,
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  done(null, user);
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
    });
  } else {
    res.render("error", {
      error: err,
    });
  }
});

module.exports = app;
