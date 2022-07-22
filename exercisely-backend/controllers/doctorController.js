import asyncHandler from 'express-async-handler';
import Doctor from '../models/doctorsModel.js';
import User from '../models/userModel.js';
import MedicalRecords from '../models/medicalRecordsModel.js';
import Patient from '../models/patientModel.js';
import Messages from '../models/messagesModel.js';
/**
 * * @desc   Register Doctor
 * * route   POST /api/v1/doctor/register
 * * @access PUBLIC
 */
export const registerDoctor = asyncHandler(async (req, res) => {
  const {
    bio,
    clinicAddress,
    homeAddress,
    dob,
    workTelephone,
    homeTelephone,
    gender,
    qualification,
  } = req.body;

  const doctor = await Doctor.create({
    bio,
    clinicAddress,
    homeAddress,
    dob,
    workTelephone,
    homeTelephone,
    gender,
    qualification,
  });
  if (doctor) {
    res.status(201).json({
      _id: doctor._id,
      bio: doctor.bio,
      clinicAddress: doctor.clinicAddress,
      homeAddress: doctor.homeAddress,
      dob: doctor.dob,
      workTelephone: doctor.workTelephone,
      homeTelephone: doctor.homeTelephone,
      gender: doctor.gender,
      qualification: doctor.qualification,
    });
  } else {
    res.status(401);
    throw new Error('Invalid Email or Password');
  }
});
/**
 * * @desc   get user id by email
 * * route   GET /api/v1/doctor/getPatient
 * ! @access PROTECTED
 */
export const getPatientIdByEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.json({
      _id: user._id,
    });
  } else {
    res.status(401);
    throw new Error('User Not Found');
  }
});
/**
 * * @desc   Create Patient Exercise
 * * route   PUT /api/v1/doctor/createPatientExercise
 * ! @access PROTECTED
 */
export const createPatientExercise = asyncHandler(async (req, res) => {
  const { pid, docId, assignedExercises } = req.body;
  //check if user already exists
  const recordExists = await MedicalRecords.findOne({ pid });
  if (recordExists) {
    throw new Error('Record already exists');
  }
  const newRecord = await MedicalRecords.create({
    patient: pid,
    doctor: docId,
    assignedExercises,
  });
  if (newRecord) {
    res.status(201).json({
      _id: newRecord._id,
    });
  } else {
    res.status(401);
    throw new Error('Invalid Email or Password');
  }
});
/**
 * * @desc   Add patient Exercise
 * * route   PUT /api/v1/doctor/addPatientExercise
 * ! @access PROTECTED
 */
export const addPatientExercise = asyncHandler(async (req, res) => {
  const { patient, newExercises } = req.body;
  const recordExists = await MedicalRecords.findOne({ pid: patient });
  if (recordExists) {
    recordExists.assignedExercises.push(...newExercises);
    const updatedExercises = await recordExists.save();
    res.json({ updatedExercises });
  } else {
    throw new Error('Record does not exists');
  }
});

/**
 * * @desc   Read Patient Messages
 * * route   GET /api/v1/doctor/:id/readMessages
 * ! @access PROTECTED
 */
export const readPatientMessages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  //check if patient details already exists
  const messages = await Messages.find({ to: id }).select(
    '-_id -from -to -updatedAt -__v'
  );
  if (!messages) {
    throw new Error('No messages');
  }

  if (messages) {
    res.status(201).json({ messages });
  } else {
    res.status(401);
    throw new Error('Invalid Data');
  }
});
/**
 * * @desc   See Patient History
 * * route   GET /api/v1/doctor/checkPatientHistory
 * ! @access PROTECTED
 */
export const checkPatientHistory = asyncHandler(async (req, res) => {
  const { firstname, lastname } = req.body;
  const userid = await User.findOne({ firstname, lastname }).select('_id');
  if (!userid) {
    res.status(401);
    throw new Error('User Does not exists');
  }
  const patientDetails = await Patient.findOne({ bio: userid }).select(
    '-bio -createdAt -updatedAt -__v'
  );
  if (!patientDetails) {
    res.status(401);
    throw new Error('Patient Details does not exists');
  }
  const medicalDetails = await MedicalRecords.findOne({
    patient: patientDetails._id,
  });
  if (!medicalDetails) {
    res.status(401);
    throw new Error('No Medical Records Exists');
  }
  res.json({
    userid,
    patientDetails,
    medicalDetails,
  });
});
