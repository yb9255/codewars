const express = require("express");
const bcrypt = require("bcrypt");
const User = require('../models/User');

const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("register");
});

router.post("/", async (req, res, next) => {
  try {
    const { id, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findOne({ id }, async (error, doc) => {
      if (error) throw error;
      if (doc) return res.send("User already exists");

      if (!doc) {
        const newUser = new User({
          id,
          password: hashedPassword,
        });

        await newUser.save();

        res.redirect("/login");
      }
    });
  } catch (error) {
  }
});

module.exports = router;
