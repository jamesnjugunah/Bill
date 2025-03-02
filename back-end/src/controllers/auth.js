const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('../middleware/async');

const registerUser = asyncHandler(async (req, res, next) => {
  const { email, phone, password } = req.body;

  let user = await User.findOne({ where: { email } });

  // encrypt password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  if (user) {
    return res.status(400).json({ msg: 'User already exists' });
  }

  user = await User.create({
    phone,
    email: email.toLowerCase(),
    password: hashedPassword,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  res.status(201).json({ token });
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter email and password' });
  }

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(401).json({ msg: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ msg: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  res.status(200).json({ token });
});

module.exports = { registerUser, loginUser };
