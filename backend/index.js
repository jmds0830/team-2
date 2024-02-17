import app from './app.js';
import express from 'express';
import process from 'node:process';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import Student from './models/StudentRegisterModel.js';
import Session from './models/SessionModel.js';
import validateStudentMiddleware from './middlewares/validateStudentMiddleware.js';
import validateLoginMiddleware from './middlewares/validateLoginMiddleware.js';
import authenticateUser from './middlewares/authenticateUserMiddleware.js';
import { timeStamp } from 'node:console';
import jwt from 'jsonwebtoken';
import PaymentBooking from './models/PaymentBookingModel.js';

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

const secretKey = "123";

const generateToken = (id) => {
    return jwt.sign({ id }, secretKey, {
      expiresIn: "30d",
    });
  };

function generateQueueId() {
  const length = 10;
  const charset =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let queueId = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    queueId += charset[randomIndex];
  }
  return queueId;
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

app.post('/login', validateLoginMiddleware, authenticateUser, async (req, res) => {
  try {
    const { student } = req;
    
    const token = generateToken(student._id);
    
    student.token = token;
    await student.save();

    res.status(200).json({
      message: 'SUCCESS! User logged in',
      user: {
        username: student.username,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error! Cannot log in user.',
      error: error.message,
    });
  }
});

app.get('/:username', async (req, res) => {
  try {
    const student = await Student.findOne({ username: req.params.username });
    const payment = await PaymentBooking.findOne({ username: req.params.username });

    if (student) {
      if (payment) {
        res.status(200).json({ 
          message: 'Payment Schedule booked for student',
          token: student.token
        });
      } else {
        res.status(200).json({ 
          message: 'Student found',
          token: student.token
        });
      }
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

app.get('/payment-booking/:username', async (req, res) => {
  try {
    const student = await Student.find({ username: req.params.username });
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

app.post('/payment-booking/:username/book-schedule', async (req, res) => {
  try {
    const student = await Student.findOne({ username: req.params.username });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const { date, time } = req.body;
    const queueId = generateQueueId();

    const newPaymentBooking = new PaymentBooking({
      queueId: await queueId,
      username: req.params.username,
      studentId: student.studentId,
      date,
      time,
    });

    const existingDate = await PaymentBooking.findOne({ date });
    const existingTime = await PaymentBooking.findOne({ time });
    const existingStudent = await PaymentBooking.findOne({ studentId: student.studentId });

    if (existingDate && existingTime) {
      res.status(400).json({
        message: 'Date and time slot is already booked by another student.',
      });
      return;
    }

    if (existingStudent) {
      res.status(400).json({
        message: 'Student with same student id has already booked a payment schedule.',
      });
      return;
    }

    await newPaymentBooking.save();

    res.status(200).json({
      message: 'SUCCESS! Payment Schedule booked.',
      newPaymentBooking,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error! Cannot book payment schedule.',
      error: error.message,
    });
  }
});

app.get('/payment-booking/:username/payment-schedule', async (req, res) => {
  try {
    const paymentBooking = await PaymentBooking.find({ username: req.params.username });
    if (!paymentBooking) {
      return res.status(404).json({
        message: 'Error! Payment schedule not found.',
      });
    }
    res.status(200).json({
      paymentBooking,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error! Cannot fetch payment schedule data.',
      error: error.message,
    });
  }
});

app.listen(app.get('port'), () => {
  console.log(`App is listening to port ${app.get('port')}`);
});
