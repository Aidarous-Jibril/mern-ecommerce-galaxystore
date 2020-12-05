import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { createToken, handleErrors } from "../utils/createToken.js";

//@ desc, REGISTER USER & CREATE TOKEN
//@req Type & route, POST, /api/users/register
//@access    Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password });
    res.send({
      _id: user._id,
      name: user.name,
      isAdmin: user.isAdmin,
      token: createToken(user._id),
    });
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }

  res.send({ email, password });
});

//@ desc, AUTH USER $ GET TOKEN
//@req Type & route, POST, /api/users/login
//@access    Public
const authenticateUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    // const token = createToken(user._id);
    // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: createToken(user._id),
    });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
});

//@ desc, Get USER PROFILE
//@req Type & route, GET, /api/users/profile
//@access    Public
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });

    // res.send('Your prof')
  } else {
    console.log("User not found");
  }
});

//@ desc, UPDATE USER PROFILE
//@req Type & route, PUT, /api/users/profile
//@access   Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: createToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { registerUser, authenticateUser, getUserProfile, updateUserProfile };
