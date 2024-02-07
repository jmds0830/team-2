import { Schema, model } from 'mongoose';

const studentSchema = new Schema({
  firstName: String,
  lastName: String,
  course: String,
  email: String,
  username: String,
});

const Student = model('Student', studentSchema);

export default Student;
