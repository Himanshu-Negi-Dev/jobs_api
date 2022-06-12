const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name field is required'],
    trim: true
  },

  email: {
    type: String,
    required: [true, 'email field is required'],
    trim: true,
    unique: true
  },

  password: {
    type: String,
    required: [true, 'This field is required'],
  }
});

userSchema.pre('save', async function(){
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.createJWT = function () {
  const user = {
    id: this._id,
    name: this.name,
    email: this.email,
  }
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1d" });
}

userSchema.methods.comparePassword = async function(candidatePassword){
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
}

const User = mongoose.model('User', userSchema);
module.exports = User;