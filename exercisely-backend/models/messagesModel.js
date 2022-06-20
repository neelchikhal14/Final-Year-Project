import mongoose from 'mongoose';

const messagesSchema = mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, ['Patient Reference should be present']],
      ref: 'User',
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, ['Doctor Reference should be present']],
      ref: 'User',
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
    },
    messageBody: {
      type: String,
      required: [true, 'Body is required'],
    },
  },
  {
    timestamps: true,
  }
);

const Messages = mongoose.model('Messages', messagesSchema);
export default Messages;
