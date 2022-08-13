import express from 'express';

const router = express.Router();

import {
  authenticateUser,
  registerUser,
  getAllUsers,
  getUserById,
  getUserByfNamelName,
  getMultipleUsers,
} from '../controllers/userController.js';

import { loginProtected } from '../middlewares/authMiddleware.js';

//BASE- /api/v1/users
router.route('/').get(loginProtected, getAllUsers).post(registerUser);
router.get('/getManyUsers/:fname/:lname', loginProtected, getMultipleUsers);
// router.get('/', loginProtected, getAllUsers);
// router.post('/', registerUser);
router.get('/getUserByName/:fname/:lname', loginProtected, getUserByfNamelName);
router.post('/login', authenticateUser);
router.get('/getUserById/:_id', loginProtected, getUserById);

export default router;
