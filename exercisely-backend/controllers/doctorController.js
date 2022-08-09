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

  const doctorDetailsAlreadyExists = await Doctor.findOne({ bio });

  // if (doctorDetailsAlreadyExists) {
  //   res.status(401);
  //   throw new Error('Details Already Exists');
  // }

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
    throw new Error('Some Error in details supplied');
  }
});
/**
 * * @desc   get user id by email
 * * route   GET /api/v1/doctor/getPatient/:firstname/:lastname
 * ! @access PROTECTED
 */
export const getPatientId = asyncHandler(async (req, res) => {
  const { firstname, lastname } = req.params;
  const user = await User.findOne({ firstname, lastname });
  if (user) {
    const patientDetails = await Patient.findOne({ bio: user._id });
    if (patientDetails) {
      res.status(200).json({
        basicDetails: user,
        bioData: patientDetails,
      });
    } else {
      res.status(401);
      throw new Error('Patient Registration is incomplete.');
    }
  } else {
    res.status(401);
    throw new Error('User Not Found');
  }
});
/**
 * * @desc   Create Patient Exercise
 * * route   POST /api/v1/doctor/createMedicalRecord
 * ! @access PROTECTED
 */
export const createMedicalRecord = asyncHandler(async (req, res) => {
  const { pid, docId } = req.body;
  //check if user already exists
  const recordExists = await MedicalRecords.findOne({ patient: pid });
  if (recordExists) {
    throw new Error('Record already exists');
  }
  const newRecord = await MedicalRecords.create({
    patient: pid,
    doctor: docId,
    assignedExercises: [],
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
  const recordExists = await MedicalRecords.findOne({ patient });
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
    '-to -updatedAt -__v'
  );
  if (!messages) {
    throw new Error('No messages');
  }

  if (messages) {
    res.status(200).json({ messages });
  } else {
    res.status(401);
    throw new Error('Invalid Data');
  }
});
/**
 * * @desc   See Patient History
 * * route   GET /api/v1/doctor/checkPatientHistory/:id
 * ! @access PROTECTED
 */
export const checkPatientHistory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({
    _id: id,
  }).select('-password -role -createdAt -updatedAt');

  if (!user) {
    res.status(401);
    throw new Error('User Does not exists');
  }
  const patientDetails = await Patient.findOne({ bio: user._id }).select(
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
    bioData: {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    },
    patientDetails,
    medicalDetails,
  });
});
/**
 * * @desc   Get Doctor's Details By Id
 * * route   GET /api/v1/doctor/:docId
 * ! @access PROTECTED
 */
export const getDoctorDetails = asyncHandler(async (req, res) => {
  const { docId } = req.params;
  const doctor = await Doctor.findOne({ bio: docId }).select('_id');
  if (!doctor) {
    res.status(401);
    throw new Error('Doctor Does not exists');
  }
  res.json({
    doctor,
  });
});
/**
 * * @desc   Check if Medical Records exists or not
 * * route   GET /api/v1/doctor/:patientId/checkMedicalRecords
 * ! @access PROTECTED
 */
export const checkMedicalRecord = asyncHandler(async (req, res) => {
  const { patientId } = req.params;
  const record = await MedicalRecords.findOne({ patient: patientId });
  if (!record) {
    res.status(401);
    throw new Error('Medical Record does not exists');
  }
  res.json({
    record,
  });
});
/**
 * * @desc   get user id by email
 * * route   GET /api/v1/doctor/getPatientByID/:id
 * ! @access PROTECTED
 */
export const getPatientByID = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id });
  console.log(user);
  if (user) {
    const patientDetails = await Patient.findOne({ bio: user._id });
    if (patientDetails) {
      res.status(200).json({
        basicDetails: user,
        bioData: patientDetails,
      });
    } else {
      res.status(401);
      throw new Error('Patient Registration is incomplete.');
    }
  } else {
    res.status(401);
    throw new Error('User Not Found');
  }
});
/**
 * * @desc   Update patient Exercise
 * * route   PUT /api/v1/doctor/updatePatientExercise
 * ! @access PROTECTED
 */
export const updatePatientExercise = asyncHandler(async (req, res) => {
  const { details } = req.body;
  const recordExists = await MedicalRecords.findOne({ patient: details.pid });
  const newExercises = [
    {
      exerciseId: details.exerciseId,
      desiredValue: details.desiredValue,
      std: details.std,
      reps: details.reps,
      assignedDate: details.assignedDate,
      videoLink: details.videoLink,
      duration: details.duration,
      assignedCompletion: details.assignedCompletion,
      status: details.status,
      instructions: details.instructions,
      sessionStats: details.sessionStats,
    },
  ];
  if (recordExists) {
    const filteredExercises = recordExists.assignedExercises.filter(
      (ex) => ex.assignedDate !== details.exerciseReference
    );
    console.log('filtered ones', filteredExercises);
    console.log('length', filteredExercises.length);
    console.log('new', newExercises[0]);
    filteredExercises.push(newExercises[0]);
    console.log('filtered ones', filteredExercises);

    recordExists.assignedExercises = [...filteredExercises];
    console.log('final', recordExists.assignedExercises);
    const updatedExercises = await recordExists.save();
    res.json({ updatedExercises });
  } else {
    throw new Error('Record does not exists');
  }
});
/**
 * * @desc   Delete patient Exercise
 * * route   PUT /api/v1/doctor/deletePatientExercise
 * ! @access PROTECTED
 */
export const deletePatientExercise = asyncHandler(async (req, res) => {
  const { details } = req.body;
  const recordExists = await MedicalRecords.findOne({ patient: details.pid });
  // const newExercises = [
  //   {
  //     exerciseId: details.exerciseId,
  //     desiredValue: details.desiredValue,
  //     std: details.std,
  //     reps: details.reps,
  //     assignedDate: details.assignedDate,
  //     duration: details.duration,
  //     assignedCompletion: details.assignedCompletion,
  //     status: details.status,
  //     instructions: details.instructions,
  //     sessionStats: details.sessionStats,
  //   },
  // ];
  if (recordExists) {
    const filteredExercises = recordExists.assignedExercises.filter(
      (ex) => ex.assignedDate !== details.exerciseReference
    );
    console.log('filtered ones', filteredExercises);
    console.log('length', filteredExercises.length);
    // console.log('new', newExercises[0]);
    // filteredExercises.push(newExercises[0]);
    console.log('filtered ones', filteredExercises);

    recordExists.assignedExercises = [...filteredExercises];
    console.log('final', recordExists.assignedExercises);
    const updatedExercises = await recordExists.save();
    res.json({ updatedExercises });
  } else {
    throw new Error('Record does not exists');
  }
});
