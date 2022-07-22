import express from 'express';

const router = express.Router();

import {
  registerDoctor,
  getPatientIdByEmail,
  addPatientExercise,
  createPatientExercise,
  readPatientMessages,
  checkPatientHistory,
} from '../controllers/doctorController.js';

import {
  doctorProtected,
  loginProtected,
  adminProtected,
} from '../middlewares/authMiddleware.js';

//BASE- /api/v1/doctor

router.post('/register', registerDoctor);
router.get('/getPatient', loginProtected, doctorProtected, getPatientIdByEmail);
router.put('/addPatientExercise', addPatientExercise);
router.post('/createPatientExercise', createPatientExercise);
// router.post('/register-patient/basicdetails', registerPatientBasic);
router.get('/:id/readMessages', readPatientMessages);
router.get('/checkPatientHistory', checkPatientHistory);

export default router;
