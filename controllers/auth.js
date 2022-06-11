const bcrypt = require('bcryptjs');
const { CustomErrorAPI } = require("../errors/CustomErrorAPI");
const { asyncWrapper } = require("../middleware/async");
const User = require('../models/user');

const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password)  throw new CustomErrorAPI("please enter email & passowrd", 401);

  const user = await User.findOne({ email });
  if(!user) throw new CustomErrorAPI("User not exist!!", 401);

  const isMatch = await user.comparePassword(password);
  if(!isMatch) throw new CustomErrorAPI("Invalid Credentials", 401);

  const token = user.createJWT();
  res.status(200).json({token});

})


const register = asyncWrapper(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) throw new CustomErrorAPI("Invalid request", 400);

  let user = await User.findOne({ email });
  if (user) throw new CustomErrorAPI(`${email} is already used please use diffrent email`, 401);
  
  user = { name, email, password }

  const newUser = await User.create(user);
  const token = newUser.createJWT();
  res.status(200).json({ token })

});


module.exports = { login, register }