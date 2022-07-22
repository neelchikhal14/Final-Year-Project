import mongoose from 'mongoose';

const medicalRecordsSchema = mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
    },
    assignedExercises: [
      {
        exerciseId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Exercise',
        },
        desiredValue: {},
        reps: Number,
        assignedDate: {
          type: Date,
        },
        duration: {
          type: Number,
        },
        assignedCompletion: {
          type: Date,
        },
        status: {
          type: String,
          enum: {
            values: ['completed', 'pending'],
            message: '{VALUE} is not supported',
          },
        },
        instructions: [],
        sessionStats: [],
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
