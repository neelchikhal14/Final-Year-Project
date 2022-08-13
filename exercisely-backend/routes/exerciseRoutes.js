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
  doctorPatientProtected,
} from '../middlewares/authMiddleware.js';

//BASE - /api/v1/exercise

router.post('/add', loginProtected, doctorProtected, addExercise);
router.get('/', loginProtected, doctorPatientProtected, getAllExercises);
router.get('/:id', loginProtected, doctorPatientProtected, getExerciseById);
export default router;
