import mongoose from 'mongoose';

const medicalRecordsSchema = mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
    },
    assignedExercises: [
      {
        doctor: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Doctor',
        },
        exerciseId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Exercise',
        },
        desiredValue: {},
        reps: Number,
        assignedDate: {
          type: Date,
          required: true,
        },
        assignedCompletion: {
          type: Date,
          required: true,
        },
        status: {
          type: String,
          required: [true, 'status is required'],
          enum: {
            values: ['completed', 'pending'],
            message: '{VALUE} is not supported',
          },
        },
        instructions: [],
        sessionStats: {},
        actualCompletionDate: Date,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const MedicalRecords = mongoose.model('MedicalRecords', medicalRecordsSchema);
export default MedicalRecords;
