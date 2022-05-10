require("dotenv").config();

const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const ejsLayout = require("express-ejs-layouts");

const index = require("./routes/index");
const login = require("./routes/login");

const app = express();

mongoose.connect(process.env.MONGODB_URL);
mongoose.connection.once("open", () => {
  console.log("MongoDB has connected");
});
mongoose.connection.on("error", err => console.log(err));

app.use(ejsLayout);
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views");

app.use("/", index);
app.use("/login", login);

app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);

  if (err.isInSubmission) {
    res.render("problem/failure", {
      error: err,
    })
  } else {
    res.render("error");
  }
});

module.exports = app;
