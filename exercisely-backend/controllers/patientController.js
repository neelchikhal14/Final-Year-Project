import asyncHandler from 'express-async-handler';
import Patient from '../models/patientModel.js';
import Messages from '../models/messagesModel.js';
import MedicalRecords from '../models/medicalRecordsModel.js';
import Exercise from '../models/exerciseModel.js';

/**
 * * @desc   Send message to the doctor
 * * route   POST /api/v1/patient/sendMessage
 * ! @access PROTECTED
 */
export const sendMessage = asyncHandler(async (req, res) => {
  const { from, to, subject, messageBody } = req.body;
  //check if patient details already exists
  const newMessage = await Messages.create({
    from,
    to,
    subject,
    messageBody,
  });
  if (newMessage) {
    res.status(201).json({
      _id: newMessage._id,
      from: newMessage.from,
      to: newMessage.to,
      subject: newMessage.subject,
      messageBody: newMessage.messageBody,
    });
  } else {
    res.status(401);
    throw new Error('Invalid Data');
  }
});
/**
 * * @desc   Get patient id from Patients Table
 * * route   GET /api/v1/patient/getId/:id
 * ! @access PROTECTED
 */
export const getPatientId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  //check if patient details already exists

  const patientId = await Patient.findOne({ bio: id }).select('_id');
  if (patientId) {
    res.status(201).json({
      patientId,
    });
  } else {
    res.status(401);
    throw new Error('No Patient Found');
  }
});
/**
 * * @desc   Get a list of Pending exercises
 * * route   GET /api/v1/patient/getPendingExercises/:id
 * ! @access PROTECTED
 */
export const getPendingExercises = asyncHandler(async (req, res) => {
  const medicalRecords = await MedicalRecords.findOne({
    patient: req.params.id,
  });

  const { assignedExercises } = medicalRecords;
  const pendingExercises = assignedExercises.filter(
    (ex) => ex.status === 'pending'
  );

  if (pendingExercises) {
    res.status(201).json({
      pendingExercises,
    });
  } else {
    res.status(404);
    throw new Error('All exercises complete');
  }
});
/**
 * * @desc   Get Doctors name from Patient Record (Medical Record)
 * * route   GET /api/v1/patient/getDocId/:id
 * ! @access PROTECTED
 */
export const getDocId = asyncHandler(async (req, res) => {
  const docId = await MedicalRecords.findOne({
    patient: req.params.id,
  }).select('doctor');

  if (docId) {
    res.status(201).json({
      docId,
    });
  } else {
    res.status(404);
    throw new Error('No Doctor Found');
  }
});
/**
 * * @desc   Update Medical records (assignedExercies) of particular exercise stats
 * * route   PUT /api/v1/patient/:id/updateExerciseStats
 * ! @access PROTECTED
 */
export const updateExerciseStats = asyncHandler(async (req, res) => {
  // exid in the params corresponds to particular assigned id in assignedExercises
  const { assignedDate, stats } = req.body;
  const currentDate = new Date();
  const currentISODate = currentDate.toISOString();
  const recordExists = await MedicalRecords.findOne({ patient: req.params.id });
  // console.log('---');
  // console.log(recordExists.assignedExercises);
  // console.log(typeof recordExists);

  if (recordExists) {
    // console.log('-------');
    // console.log('recordExists', recordExists);
    // console.log('***');
    // console.log('coming from body');
    // console.log(exid);
    // console.log(stats);

    const { assignedExercises } = recordExists;
    assignedExercises.forEach((ex) => {
      if (!ex.sessionStats) {
        ex['sessionStats'] = [];
      }

      // console.log('()()()');
      // console.log(ex);
      // console.log(`999--${ex.exerciseId}--999`);
      // console.log(`999--${exid}--999`);
      if (ex.assignedDate.toString() === assignedDate.toString()) {
        // console.log('****I EXECUTED*****');
        ex['status'] = 'completed';
        ex['sessionStats'] = [...stats];
        ex['actualCompletionDate'] = currentISODate;
        // console.log('EX', ex);
      }
    });
    // console.log('assignedExercises', assignedExercises);

    const updatedRecords = await MedicalRecords.findOneAndUpdate(
      { patient: req.params.id },
      { assignedExercises }
    );
    res.json({ status: 'Session Statistics Saved', record: updatedRecords });
  } else {
    throw new Error('Record does not exists');
  }
});
/**
 * * @desc   Get Exercise Stats within a given date range
 * * route   GET /:id/getExerciseStats/:fromdate/:todate
 * ! @access PROTECTED
 */
export const getExerciseStats = asyncHandler(async (req, res) => {
  // exid in the params corresponds to particular assigned id in assignedExercises

  const { fromdate, todate } = req.params;
  const fromISODate = new Date(fromdate);
  const toISODate = new Date(todate);
  let stats = [];
  const recordExists = await MedicalRecords.findOne({
    patient: req.params.id,
  });
  // console.log('record', recordExists);
  if (recordExists) {
    const { assignedExercises } = recordExists;
    // console.log(assignedExercises);
    assignedExercises.forEach(async (ex) => {
      if (ex.status === 'completed') {
        const assignedISODate = new Date(ex.assignedDate);
        if (
          assignedISODate.getTime() >= fromISODate.getTime() &&
          assignedISODate.getTime() <= toISODate.getTime()
        ) {
          stats.push({
            exerciseDetails: ex,
          });
        }
      }
    });

    res.json({ stats });
  } else {
    throw new Error('Record does not exists');
  }
});
/**
 * * @desc   Get Basic Details of Patient
 * * route   POST /api/v1/patient/register-patient/basicdetails
 * ! @access PROTECTED
 */
export const registerPatientBasic = asyncHandler(async (req, res) => {
  const {
    bio,
    age,
    address,
    gender,
    dob,
    homeTelephone,
    mobileTelephone,
    nextOfKin,
    maritalStatus,
  } = req.body;
  //check if patient details already exists
  const patientDetailsExists = await Patient.findOne({ bio });
  if (patientDetailsExists) {
    throw new Error('Patient Details already exists');
  }

  const patientDetails = await Patient.create({
    bio,
    age,
    address,
    gender,
    dob,
    homeTelephone,
    mobileTelephone,
    nextOfKin,
    maritalStatus,
  });
  if (patientDetails) {
    res.status(201).json({
      _id: patientDetails._id,
      bio: patientDetails.bio,
      age: patientDetails.age,
      address: patientDetails.address,
      gender: patientDetails.gender,
      dob: patientDetails.dob,
      homeTelephone: patientDetails.homeTelephone,
      mobileTelephone: patientDetails.mobileTelephone,
      nextOfKin: patientDetails.nextOfKin,
      maritalStatus: patientDetails.maritalStatus,
    });
  } else {
    res.status(401);
    throw new Error('Invalid Data');
  }
});
