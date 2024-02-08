import { Schema, model } from 'mongoose';

const studentSchema = new Schema({
  firstName: String,
  lastName: String,
  course: String,
  college: String,
  email: String,
  username: String,
  studentId: Number,
  image: {
    data: Buffer,
    contentType: String,
  },
});

const Student = model('Student', studentSchema);

export default Student;
