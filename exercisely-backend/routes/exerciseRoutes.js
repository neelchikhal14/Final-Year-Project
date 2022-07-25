import express from 'express';

const router = express.Router();

import {
  addExercise,
  getAllExercises,
  getExerciseById,
} from '../controllers/exerciseController.js';

import {
  loginProtected,
  doctorProtected,
} from '../middlewares/authMiddleware.js';

//BASE - /api/v1/exercise

router.post('/add', loginProtected, doctorProtected, addExercise);
router.get('/', loginProtected, doctorProtected, getAllExercises);
router.get('/:id', loginProtected, doctorProtected, getExerciseById);
export default router;
