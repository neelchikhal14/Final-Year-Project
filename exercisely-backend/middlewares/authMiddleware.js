import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

export const loginProtected = asyncHandler(async (req, res, next) => {
  let token;
  // console.log('Auth Middleware req', req);
  // console.log('################################');
  // console.log(req.headers.authorization);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      // console.log('tpken', token);
      // console.log(process.env.JWT_SECRET);
      // console.log(jwt.verify(token, process.env.JWT_SECRET));
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(decoded.id);
      // console.log('################################');
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401);
      // console.log(error);
      throw new Error('Session Expired. Please login Again');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Not Authorized . No token');
  }
});

export const doctorProtected = asyncHandler(async (req, res, next) => {
  let permitted = false;

  if (req?.user?.role === 'doctor') {
    permitted = true;
  }

  if (!permitted) {
    res.status(401);
    throw new Error('You dont have to sufficient permission');
  }
  next();
});
export const doctorPatientProtected = asyncHandler(async (req, res, next) => {
  let permitted = false;

  if (req?.user?.role === 'doctor' || req?.user?.role === 'patient') {
    permitted = true;
  }

  if (!permitted) {
    res.status(401);
    throw new Error('You dont have to sufficient permission');
  }
  next();
});

// export const checkSession = asyncHandler(async (req, res, next) => {
//   let token;
//   console.log('*********************************');
//   console.log('checkSession req user', req.user);
//   console.log('checkSession req headers', req.headers.authorization);
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     console.log('checkSession token found');

//     try {
//       token = req.headers.authorization.split(' ')[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       console.log('decoded from chk session', decoded);
//       const expTime = Number(decoded.exp) * 1000;
//       console.log('exp time', expTime);
//       console.log('date.now()', Date.now());
//       if (!(Date.now() > expTime)) {
//         req.user = await User.findById(decoded.id).select('-password');
//         console.log('req.user', req.user);
//         console.log('*********************************');
//         next();
//       } else {
//         throw new Error();
//       }
//     } catch (error) {
//       res.status(401);
//       throw new Error('Session Expired');
//     }
//   }
//   if (!token) {
//     res.status(401);
//     throw new Error('Not Authorized . No token');
//   }
// });
