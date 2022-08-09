import express from 'express';

const router = express.Router();

import {
  authenticateUser,
  registerUser,
  getAllUsers,
  getUserById,
  getUserByfNamelName,
} from '../controllers/userController.js';

import { loginProtected } from '../middlewares/authMiddleware.js';

//BASE- /api/v1/users
router.get('/', loginProtected, getAllUsers);
router.get('/:_id', loginProtected, getUserById);
router.post('/', registerUser);
router.post('/login', authenticateUser);
router.get('/:fname/:lname', loginProtected, getUserByfNamelName);

export default router;
