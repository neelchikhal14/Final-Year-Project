import express from 'express';

const router = express.Router();

import {
  sendMessage,
  getPendingExercises,
  updateExerciseStats,
  getExerciseStats,
} from '../controllers/patientController.js';

import {
  doctorProtected,
  loginProtected,
  adminProtected,
} from '../middlewares/authMiddleware.js';

//BASE- /api/v1/patient

router.post('/sendmessage', loginProtected, sendMessage);
router.get('/:id/getPendingExercises', loginProtected, getPendingExercises);
router.put('/:id/updateExerciseStats', loginProtected, updateExerciseStats);
router.get('/:id/getExerciseStats', loginProtected, getExerciseStats);

export default router;
