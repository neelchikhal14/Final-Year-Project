import express from 'express';

const router = express.Router();

import {
  registerDoctor,
  getPatientId,
  addPatientExercise,
  createMedicalRecord,
  readPatientMessages,
  checkPatientHistory,
  checkMedicalRecord,
  getDoctorDetails,
} from '../controllers/doctorController.js';

import {
  loginProtected,
  doctorProtected,
} from '../middlewares/authMiddleware.js';

//BASE- /api/v1/doctor

router.post('/register', loginProtected, doctorProtected, registerDoctor);
router.get(
  '/getPatient/:firstname/:lastname',
  loginProtected,
  doctorProtected,
  getPatientId
);
router.get('/:docId', loginProtected, doctorProtected, getDoctorDetails);
router.put(
  '/addPatientExercise',
  loginProtected,
  doctorProtected,
  addPatientExercise
);
router.post(
  '/createMedicalRecord',
  loginProtected,
  doctorProtected,
  createMedicalRecord
);
// router.post('/register-patient/basicdetails', registerPatientBasic);
router.get(
  '/:id/readMessages',
  loginProtected,
  doctorProtected,
  readPatientMessages
);
router.get(
  '/checkPatientHistory/:fname/:lname',
  loginProtected,
  doctorProtected,
  checkPatientHistory
);
router.get(
  '/:patientId/checkMedicalRecords',
  loginProtected,
  doctorProtected,
  checkMedicalRecord
);
export default router;
