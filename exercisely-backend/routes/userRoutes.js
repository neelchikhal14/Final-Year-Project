import express from 'express';

const router = express.Router();

import {
  authenticateUser,
  registerUser,
  getAllUsers,
  getUserById,
} from '../controllers/userController.js';

import {
  doctorProtected,
  loginProtected,
  adminProtected,
} from '../middlewares/authMiddleware.js';

//BASE- /api/v1/users
router.get('/', loginProtected, adminProtected, getAllUsers);
router.get('/:_id', getUserById);
router.post('/', registerUser);
router.post('/login', authenticateUser);

export default router;
