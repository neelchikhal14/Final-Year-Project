import express from 'express';

const router = express.Router();

import {
  addExercise,
  getAllExercises,
} from '../controllers/exerciseController.js';

import {
  loginProtected,
  adminProtected,
} from '../middlewares/authMiddleware.js';

//BASE - /api/v1/exercise

router.post('/add', loginProtected, adminProtected, addExercise);
router.get('/', loginProtected, adminProtected, getAllExercises);
export default router;
