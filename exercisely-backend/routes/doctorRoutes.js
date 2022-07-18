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
  doctorProtected,
  loginProtected,
  adminProtected,
} from '../middlewares/authMiddleware.js';

//BASE- /api/v1/doctor

router.post('/register', registerDoctor);
router.get('/getPatient/:firstname/:lastname', getPatientId);
router.get('/:docId', getDoctorDetails);
router.put('/addPatientExercise', addPatientExercise);
router.post('/createMedicalRecord', createMedicalRecord);
// router.post('/register-patient/basicdetails', registerPatientBasic);
router.get('/:id/readMessages', readPatientMessages);
router.get('/checkPatientHistory/:fname/:lname', checkPatientHistory);
router.get('/:patientId/checkMedicalRecords', checkMedicalRecord);
export default router;
