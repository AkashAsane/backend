const User = require("../models/user");
const passport = require("passport");
const localStatergy = require("passport-local");

passport.use(
  new localStatergy(async (username, password, done) => {
    try {
      const user =await User.findOne({ username: username });

      if (!user) return done(null, false, { message: "incorrect username" });

      const ispasswordMatch = await user.comparePassword(password)

      if (ispasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "incorrect password" });
      }
    } catch (error) {
      return done(err);
    }
  })
);


module.exports=passport