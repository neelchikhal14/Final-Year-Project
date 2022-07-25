import express from 'express';

const router = express.Router();

import {
  sendMessage,
  getPendingExercises,
  updateExerciseStats,
  getExerciseStats,
  getPatientId,
  getDocId,
  registerPatientBasic,
} from '../controllers/patientController.js';

import {
  loginProtected,
  doctorPatientProtected,
} from '../middlewares/authMiddleware.js';

//BASE- /api/v1/patient

router.post(
  '/sendmessage',
  loginProtected,
  doctorPatientProtected,
  sendMessage
);
router.get(
  '/getPendingExercises/:id',
  loginProtected,
  doctorPatientProtected,
  getPendingExercises
);
router.get('/getId/:id', loginProtected, doctorPatientProtected, getPatientId);
router.put(
  '/:id/updateExerciseStats',
  doctorPatientProtected,
  updateExerciseStats
);
router.get(
  '/:id/getExerciseStats/:fromdate/:todate',
  loginProtected,
  doctorPatientProtected,
  getExerciseStats
);
// router.get('/getDocId/:id',  getDocId);
router
  .route('/getDocId/:id')
  .get(loginProtected, doctorPatientProtected, getDocId);
router
  .route('/register-patient/basicdetails')
  .post(loginProtected, doctorPatientProtected, registerPatientBasic);

export default router;
