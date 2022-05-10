const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const { getUser } = require("../controllers/users.contorller");

async function initializePassport(passport) {
  const authenticateUser = async (userId, password, done) => {
    const user = getUser(userId);

    if (!user) {
      return done(null, false, { message: "No user with that Id"});
    }

    try {
      const isSamePwd = await bcrypt.compare(password, user.password);
      if (isSamePwd) {
        return done(null, user);
      } else {
        return done(null, false, { message: "password incorrect" });
      }
    } catch (error) {
      return done(error);
    }
  }


  passport.use(new LocalStrategy({
    usernameField: "text",
  },
  authenticateUser));

  passport.serializeUser((user, done) => done(null, user.userId));
  passport.deserializeUser((userId, done) => {
    return done(null, getUser(userId));
  });
}

module.exports = {
  initializePassport,
};
