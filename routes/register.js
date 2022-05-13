const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const CustomError = require("../utils/CustomError");

const {
  isLoggedOut,
} = require("../utils/passport-config");

const router = express.Router();

router.get("/", isLoggedOut, (req, res, next) => {
  res.status(200).render("register/register");
});

router.post("/", async (req, res, next) => {
  try {
    const { id, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    User.findOne({ id }, async (error, doc) => {
      if (error) {
        next(new CustomError(error, 500));
        return;
      }

      if (doc) {
        return res.status(400).render("register/user-exist");
      }

      if (!doc) {
        const newUser = new User({
          id,
          password: hashedPassword,
        });

        await newUser.save();

        res.status(200).render("register/signup-success");
      }
    });
  } catch (error) {
    next(new CustomError(error, 500));
  }
});

module.exports = router;
