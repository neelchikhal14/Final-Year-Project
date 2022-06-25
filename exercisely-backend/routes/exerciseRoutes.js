import express from 'express';

const router = express.Router();

import {
  addExercise,
  getAllExercises,
  getExerciseById,
} from '../controllers/exerciseController.js';

import {
  loginProtected,
  adminProtected,
} from '../middlewares/authMiddleware.js';

//BASE - /api/v1/exercise

router.post('/add', loginProtected, adminProtected, addExercise);
router.get('/', loginProtected, getAllExercises);
router.get('/:id', loginProtected, getExerciseById);
export default router;
