import app from './app.js';
import express from 'express';
import process from 'node:process';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import Student from './models/StudentRegisterModel.js';
import Session from './models/SessionModel.js';
import Subject from './models/SubjectModel.js';
import validateStudentMiddleware from './middlewares/validateStudentMiddleware.js';
import validateLoginMiddleware from './middlewares/validateLoginMiddleware.js';
import { timeStamp } from 'node:console';

const PORT = process.env.PORT || 3000;

await mongoose.connect('mongodb://127.0.0.1:27017/ensys');

app.set('port', PORT);
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

async function generateStudentId() {
  const currentYear = new Date().getFullYear();
  const studentCount = await Student.countDocuments();
  const formattedIndex = (studentCount + 1).toString().padStart(4, '0');
  const studentId = `${currentYear}${formattedIndex}`;
  return studentId;
}

function generatePassword() {
  const length = 10;
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

async function assignCollege(course) {
  let college;

  if (course === 'BS Civil Engineering') {
    college = 'Engineering';
  } else if (course === 'BS Information Technology') {
    college = 'Information Technology';
  } else if (course === 'BS Entrepreneurship') {
    college = 'Business';
  }
  return college;
}

app.post('/register', validateStudentMiddleware, async (req, res) => {
  try {
    const { firstName, lastName, course, email, username } = req.body;
    const studentId = generateStudentId();
    const password = generatePassword();

    const college = await assignCollege(course);

    const newStudent = new Student({
      firstName,
      lastName,
      course,
      college,
      email,
      username,
      studentId: await studentId,
      password,
    });

    const existingStudent = await Student.findOne({ username });
    const existingemail = await Student.findOne({ email });

    if (existingStudent) {
      res.status(400).json({
        message: 'Error! Username already exists.',
      });
      return;
    }

    if (existingemail) {
      res.status(400).json({
        message: 'Error! Email already exists.',
      });
      return;
    }

    await newStudent.save();

    res.status(200).json({
      message: 'SUCCESS! New student added',
      newStudent,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error! Cannot register student.',
      error: error.message,
    });
  }
});

app.get('/student-info/:id', async (req, res) => {
  try {
    const student = await Student.find({ studentId: req.params.id });
    if (!student) {
      return res.status(404).json({
        message: 'Error! Student not found.',
      });
    }
    res.status(200).json({
      student,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error! Cannot fetch student data.',
      error: error.message,
    });
  }
});

app.patch('/student-info/:id', async (req, res) => {
  try {
    const student = await Student.findOne({ studentId: req.params.id });

    if (!student) {
      res.status(404).json({
        message: 'ERROR! Student not found. ',
      });
      return;
    }

    const { firstName, lastName, course, college, email, username, password } =
      req.body;
    const existingStudentWithUsername = await Student.findOne({ username });
    const existingStudentwithEmail = await Student.findOne({ email });

    if (
      existingStudentWithUsername &&
      existingStudentWithUsername._id.toString() !== student._id.toString()
    ) {
      res.status(400).json({
        message: 'Error! Username already exists.',
      });
      return;
    }

    if (
      existingStudentwithEmail &&
      existingStudentwithEmail._id.toString() !== student._id.toString()
    ) {
      res.status(400).json({
        message: 'Error! Email already exists.',
      });
      return;
    }

    student.firstName = firstName || student.firstName;
    student.lastName = lastName || student.lastName;
    student.course = course || student.course;
    student.college = college || student.college;
    student.email = email || student.email;
    student.username = username || student.username;
    student.password = password || student.password;

    await student.save();

    res.status(200).json({
      message: 'Student Info updated successfully.',
      data: student,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error! Failed to update student information.',
      error: error.message,
    });
  }
});

app.post('/login', validateLoginMiddleware, async (req, res) => {
  try {
    const { username, password } = req.body;

    const student = await Student.findOne({ username });

    const newSession = new Session({
      username,
      createdAt: new Date(),
    });

    await newSession.save();

    // const existingSession = await Session.findOne({ username });

    // if (existingSession) {
    //   await Session.deleteOne({ username });
    // }

    res.status(200).json({
      message: 'SUCCESS! User logged in',
      user: {
        username,
      },
      sessionToken: newSession._id,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error! Cannot log in user.',
      error: error.message,
    });
  }
});

app.post('/admin/add-subject', async (req, res) => {
  try {
    const { subjectName, subjectCode, units, date, time, instructor } =
      req.body;

    if (
      !subjectName ||
      !subjectCode ||
      !units ||
      !date ||
      !time ||
      !instructor
    ) {
      res.status(400).json({
        message: 'Error! Input all necessary fields.',
      });
      return;
    }

    const newSubject = new Subject({
      subjectName,
      subjectCode,
      units,
      date,
      time,
      instructor,
    });

    const existingSubjectCode = await Subject.findOne({ subjectCode });

    if (existingSubjectCode) {
      res.status(400).json({
        message: 'Error! Subject code already exists.',
      });
      return;
    }

    await newSubject.save();
    res.status(200).json({
      message: 'Subject added successfully.',
      data: newSubject,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error! Cannot add subject.',
      error: error.message,
    });
  }
});

app.patch('/admin/update-subject/:subjId', async (req, res) => {
  try {
    const subject = await Subject.findOne({ subjectCode: req.params.subjId });

    if (!subject) {
      res.status(400).json({
        message: 'Error! Subject not found.',
        error: error.message,
      });
    }

    const { subjectName, subjectCode, units, date, time, instructor } =
      req.body;

    subject.subjectName = subjectName || subject.subjectName;
    subject.subjectCode = subjectCode || subject.subjectCode;
    subject.units = units || subject.units;
    subject.date = date || subject.date;
    subject.time = time || subject.time;
    subject.instructor = instructor || subject.instructor;

    await subject.save();
    res.status(200).json({
      message: 'Subject updated successfully.',
      data: subject,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error! Cannot update subect.',
      error: error.message,
    });
  }
});

app.delete('/admin/delete-subject/:subjId', async (req, res) => {
  try {
    const subject = await Subject.findOne({ subjectCode: req.params.subjId });

    await subject.deleteOne();
    res.status(200).json({
      message: 'Subject deleted successfully.',
      data: subject,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error! Cannot delete subect.',
      error: error.message,
    });
  }
});

app.get('/subjects', async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.send(subjects);
  } catch (error) {
    res.status(400).json({
      message: 'Error! Cannot fetch subjects.',
      error: error.message,
    });
  }
});

app.listen(app.get('port'), () => {
  console.log(`App is listening to port ${app.get('port')}`);
});
