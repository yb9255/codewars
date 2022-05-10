const express = require("express");

const {
  registerNewUser,
} = require("../controllers/users.contorller");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("register");
});

router.post("/", async (req, res, next) => {
  try {
    const { id: newId, password: newPassword } = req.body;

    await registerNewUser(newId, newPassword);

    res.redirect("/login");
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
