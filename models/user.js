const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  createdAt: { type: Date, default: Date.now }
});


userSchema.pre("save", async function (next) {
    const user = this;
  
    if (!user.isModified('password')) return next();
  
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedpassword = await bcrypt.hash(user.password, salt);
      user.password = hashedpassword;
      next();
    } catch (err) {
      next(err); 
    }
  });
  
  userSchema.methods.comparePassword = async function (userpassword) {
    try {
      const isMatch = await bcrypt.compare(userpassword, this.password);
      return isMatch;
    } catch (error) {
      throw error;
    }
  };

  const User = mongoose.model("User", userSchema);

  module.exports = User;
