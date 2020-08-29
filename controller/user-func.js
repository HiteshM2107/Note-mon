// const { validationResult } = require("express-validator");
const User = require("../models/user-schema");
const { title } = require("process");

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    return next("Fetching users failed");
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   //console.log(errors);
  //   return next("Invalid input passed");
  // }

  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next("error");
  }

  if (existingUser) {
    res.json({ message: "error" });
    return next(error);
  }
  const createdUser = new User({
    name,
    email,
    password,
  });
  try {
    await createdUser.save();
  } catch (err) {
    console.log(err);

    return next("FAILED!!!");
  }
  res.status(201).json({ user: createdUser });
};
// function to LOGIN an existing user
const login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
    // console.log(email);
    // console.log(existingUser);
  } catch (err) {
    console.log(err);
    return next("Login failed");
  }

  if (!existingUser || existingUser.password !== password) {
    res.json({ message: "error" });
    return next(error);
  }
  res.send(existingUser._id);
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
