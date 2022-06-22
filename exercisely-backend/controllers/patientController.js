import asyncHandler from 'express-async-handler';
import Patient from '../models/patientModel.js';
import Messages from '../models/messagesModel.js';
import MedicalRecords from '../models/medicalRecordsModel.js';

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
 * * @desc   Get a list of Pending exercises
 * * route   POST /api/v1/patient/:id/getPendingExercises
 * ! @access PROTECTED
 */
export const getPendingExercises = asyncHandler(async (req, res) => {
  const medicalRecords = await MedicalRecords.findOne({
    patient: req.params.id,
  });
  console.log(medicalRecords);
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
 * * @desc   Update Medical records (assignedExercies) of particular exercise stats
 * * route   POST /api/v1/patient/:id/updateExerciseStats
 * ! @access PROTECTED
 */
export const updateExerciseStats = asyncHandler(async (req, res) => {
  // exid in the params corresponds to particular assigned id in assignedExercises
  const { exid, stats } = req.body;
  const recordExists = await MedicalRecords.findOne({ patient: req.params.id });
  // console.log('---');
  // console.log(recordExists.assignedExercises);
  // console.log(typeof recordExists);
  if (recordExists) {
    const { assignedExercises } = recordExists;
    assignedExercises.forEach((ex) => {
      if (ex._id.toString() === exid) {
        ex.status = 'completed';
        /**
         * TODO : !!! NEED TO PUT LOGIC TO UPDATE STATS
         */
        ex.sessionStats = stats;
      }
    });

    const updatedRecords = await recordExists.save();
    res.json({ updatedRecords });
  } else {
    throw new Error('Record does not exists');
  }
});
/**
 * * @desc   Get Exercise Stats within a given date range
 * * route   GET /api/v1/patient/:id/getExerciseStats
 * ! @access PROTECTED
 */
export const getExerciseStats = asyncHandler(async (req, res) => {
  // exid in the params corresponds to particular assigned id in assignedExercises
  const { from, to } = req.body;
  const fromISODate = new Date(from);
  const toISODate = new Date(to);
  let stats = [];
  const recordExists = await MedicalRecords.findOne({
    patient: req.params.id,
  });
  // console.log('record', recordExists);
  if (recordExists) {
    const { assignedExercises } = recordExists;
    // console.log(assignedExercises);
    assignedExercises.forEach((ex) => {
      if (ex.status === 'completed') {
        const assignedISODate = new Date(ex.assignedDate);
        if (
          assignedISODate.getTime() >= fromISODate.getTime() &&
          assignedISODate.getTime() <= toISODate.getTime()
        ) {
          stats.push({
            completionDate: ex.actualCompletionDate,
            sessionStats: ex.sessionStats,
          });
        }
      }
    });
    const updatedRecords = await recordExists.save();
    res.json({ stats });
  } else {
    throw new Error('Record does not exists');
  }
});