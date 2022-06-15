import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, 'Firstname is required'],
    },
    lastname: {
      type: String,
      required: [true, 'Lastname is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      enum: {
        values: ['admin', 'doctor', 'patient'],
        message: '{VALUE} is not supported',
      },
    },
  },
  {
    timestamps: true,
  }
);

//password hashing middleware on mongoose before saving password
userSchema.pre('save', async function (next) {
  const user = this;
  //check if password was modified
  if (!user.isModified('password')) {
    next();
  }
  //generate salt
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

//method
userSchema.methods.matchPassword = async function (enteredPassword) {
  const user = this;
  return await bcrypt.compare(enteredPassword, user.password);
};

const User = mongoose.model('User', userSchema);

export default User;
