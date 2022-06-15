import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

export const loginProtected = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // req.user.role = await User.findById(decoded.id).select('role');
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not Authorized.');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Not Authorized . No token');
  }
});
export const doctorProtected = asyncHandler(async (req, res, next) => {
  if (req.user.role !== 'doctor') {
    res.status(401);
    throw new Error('You dont have to access to check these records');
  }
  const { email } = req.body;
  const requestedUser = await User.findOne({ email });
  if (requestedUser.role !== 'patient') {
    res.status(401);
    throw new Error('You dont have to access to check these records');
  }
  next();
});
export const adminProtected = asyncHandler(async (req, res, next) => {
  if (req.user.role !== 'admin') {
    res.status(401);
    throw new Error('You dont have to access to check these records');
  }
  next();
});
