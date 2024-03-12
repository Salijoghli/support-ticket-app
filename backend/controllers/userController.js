const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { json } = require("express");

//generate token
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });

// @desc  register a new user
// @route api/users/signup
// access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //validations
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Include all the fields");
  }

  //check if user exits
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc  login a new user
// @route api/users/login
// access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid user info");
  }
});

// @desc  Get current user info
// @route api/users/me
// access private
const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user.id,
    email: req.user.email,
    name: req.user.name,
  };
  res.status(200).json(user);
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
