import { Schema, model } from 'mongoose';

const subjectSchema = new Schema({
  subjectName: String,
  subjectCode: String,
  units: Number,
  date: String,
  time: String,
  instructor: String,
});

const Subject = model('Subject', subjectSchema);

export default Subject;
