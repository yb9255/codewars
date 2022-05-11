const User = require("../models/User");
const bcrypt = require("bcrypt");

async function getUser(id) {
  return await User.findOne({ id });
}

async function registerNewUser(newId, newPassword) {
  const hasSameId = await getUser(newId);

  if (hasSameId) return;

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const newUser = {
    id: newId,
    password: hashedPassword,
  }

  await new User(newUser).save();
}

module.exports = {
  registerNewUser,
  getUser,
}