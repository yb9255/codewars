const users = require("../models/User");
const bcrypt = require("bcrypt");

async function getUser(id) {
  return await users.findOne({ userId: id });
}

async function registerNewUser(newId, newPassword) {
  const hasSameId = await getUser(newId);

  if (hasSameId) return;

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  console.log(hashedPassword);

  const newUser = {
    userId: newId,
    password: hashedPassword,
  }

  await new users(newUser).save();
}

module.exports = {
  registerNewUser,
  getUser,
}