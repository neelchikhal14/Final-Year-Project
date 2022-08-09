import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

/**
 * * @desc   authenticate user & get token
 * * route   POST /api/v1/users/login
 * * @access PUBLIC
 */
export const authenticateUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid Email or Password');
  }
});
/**
 * * @desc   Register User
 * * route   POST /api/v1/users
 * * @access PUBLIC
 */
export const registerUser = asyncHandler(async (req, res) => {
  const { title, firstname, lastname, email, password, role } = req.body;
  //check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('User already exists');
  }
  const user = await User.create({
    title,
    firstname,
    lastname,
    email,
    password,
    role,
  });
  if (user) {
    res.status(201).json({
      success: true,
    });
  } else {
    res.status(401);
    throw new Error('Invalid Email or Password');
  }
});
/**
 * * @desc   get all users
 * * route   GET /api/v1/users/
 * !  @access PROTECTED
 */
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});

  if (users) {
    res.json(users);
  } else {
    res.status(401);
    throw new Error('Users not found');
  }
});
/**
 * * @desc   get user by id
 * * route   GET /api/v1/users/:_id
 * !  @access PROTECTED
 */
export const getUserById = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const user = await User.findById({ _id });

  if (user) {
    res.json(user);
  } else {
    res.status(401);
    throw new Error('User not found');
  }
});
/**
 * * @desc   get user by fName,lname
 * * route   GET /api/v1/users/:fname/:lname
 * !  @access PROTECTED
 */
export const getUserByfNamelName = asyncHandler(async (req, res) => {
  const { fname, lname } = req.params;
  console.log(fname, lname);
  const user = await User.findOne({ firstname: fname, lastname: lname }).select(
    '_id'
  );
  console.log(user);
  if (user) {
    res.json(user);
  } else {
    res.status(401);
    throw new Error('User not found');
  }
});
