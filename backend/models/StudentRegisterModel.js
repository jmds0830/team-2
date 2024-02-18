import { Schema, model } from 'mongoose';

const studentSchema = new Schema({
  firstName: String,
  lastName: String,
  course: String,
  college: String,
  email: String,
  username: String,
  studentId: Number,
  password: String,
  token: String,
  subjects: [
    {
      subjectName: String,
      subjectCode: String,
      units: Number,
      date: String,
      time: String,
      instructor: String,
      slots: Number,
    },
  ],
  photo: {
    data: Buffer,
    contentType: String,
  },
});

const Student = model('Student', studentSchema);

export default Student;
