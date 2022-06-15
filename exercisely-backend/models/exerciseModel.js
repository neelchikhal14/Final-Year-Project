import mongoose from 'mongoose';

const exerciseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Exercise Should have a name'],
      unique: true,
    },
    bodyParams: [
      {
        pointOne: Number,
        pointTwo: Number,
        pointThree: Number,
        bodyPartName: String,
      },
    ],
    repsRequired: Boolean,
  },
  {
    timestamps: true,
  }
);

const Exercise = mongoose.model('Exercise', exerciseSchema);
export default Exercise;
