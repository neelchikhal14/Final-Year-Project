import mongoose from 'mongoose';

const patientSchema = mongoose.Schema(
  {
    bio: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, ['Patient should have basic refernce']],
      ref: 'User',
    },
    age: {
      type: Number,
      required: [true, 'Age must be entered'],
    },
    address: {
      country: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      addressLine: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
    },
    gender: {
      type: String,
      required: [true, 'gender is required'],
      enum: {
        values: [
          'man',
          'woman',
          'transgender woman',
          'transgender man',
          'non binary',
        ],
        message: '{VALUE} is not supported',
      },
    },
    dob: {
      type: Date,
      required: true,
    },
    homeTelephone: {
      type: String,
      required: [true, 'Home Telephone is required'],
    },
    mobileTelephone: {
      type: String,
      required: [true, 'Mobile Telephone is required'],
    },
    nextOfKin: {
      name: {
        type: String,
        required: [true, 'Next of Kin Name is required'],
      },
      telephone: {
        type: String,
        required: [true, 'Next of Kin Telephone is required'],
      },
      relationship: {
        type: String,
        required: [true, 'Next of Kin Relationship is required'],
      },
    },
    maritalStatus: {
      type: String,
      required: [true, 'marital status is required is required'],
      enum: {
        values: ['single', 'married', 'divorced'],
        message: '{VALUE} is not supported',
      },
    },
    additionalNotes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Patient = mongoose.model('Patient', patientSchema);
export default Patient;
