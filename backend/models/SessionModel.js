import { Schema, model } from 'mongoose';

const sessionSchema = new Schema(
  {
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: false,
  }
);

const Session = model('Session', sessionSchema);

export default Session;