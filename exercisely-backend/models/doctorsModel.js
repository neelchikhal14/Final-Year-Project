import mongoose from 'mongoose';

const doctorsSchema = mongoose.Schema(
  {
    bio: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Doctor Reference should be present'],
      ref: 'User',
    },
    clinicAddress: {
      streetAddressLineOne: {
        type: String,
        required: true,
      },
      streetAddressLineTwo: {
        type: String,
      },
      country: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
    },
    homeAddress: {
      streetAddressLineOne: {
        type: String,
        required: true,
      },
      streetAddressLineTwo: {
        type: String,
      },
      country: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
    },
    dob: {
      type: Date,
      required: true,
    },
    workTelephone: {
      type: String,
      required: [true, 'Home Telephone is required'],
    },
    homeTelephone: {
      type: String,
      required: [true, 'Home Telephone is required'],
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
    qualification: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Doctor = mongoose.model('Doctor', doctorsSchema);
export default Doctor;
