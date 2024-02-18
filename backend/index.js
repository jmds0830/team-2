import app from './app.js';
import express from 'express';
import process from 'node:process';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import Student from './models/StudentRegisterModel.js';
import Subject from './models/SubjectModel.js';
import validateStudentMiddleware from './middlewares/validateStudentMiddleware.js';
import validateLoginMiddleware from './middlewares/validateLoginMiddleware.js';
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

function generateToken(studentId) {
  const secretKey = '123';
  const payload = { studentId };
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
  return token;
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

app.get('/student-info/:username', async (req, res) => {
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

app.patch('/student-info/:username', async (req, res) => {
  try {
    const student = await Student.findOne({ username: req.params.username });

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
    const payment = await PaymentBooking.findOne({
      username: req.params.username,
    });

    if (student) {
      if (payment) {
        res.status(200).json({
          message: 'Payment Schedule booked for student',
          token: student.token,
        });
      } else {
        res.status(200).json({
          message: 'Student found',
          token: student.token,
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

app.post('/admin/add-subject', async (req, res) => {
  try {
    const { subjectName, subjectCode, units, date, time, instructor } =
      req.body;
    const slots = 30;

    if (
      !subjectName ||
      !subjectCode ||
      !units ||
      !date ||
      !time ||
      !instructor ||
      !slots
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
      slots,
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
    const existingStudent = await PaymentBooking.findOne({
      studentId: student.studentId,
    });

    if (existingDate && existingTime) {
      res.status(400).json({
        message: 'Date and time slot is already booked by another student.',
      });
      return;
    }

    if (existingStudent) {
      res.status(400).json({
        message:
          'Student with same student id has already booked a payment schedule.',
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

app.patch('/admin/update-subject/:subjId', async (req, res) => {
  try {
    const subject = await Subject.findOne({ subjectCode: req.params.subjId });

    if (!subject) {
      res.status(400).json({
        message: 'Error! Subject not found.',
        error: error.message,
      });
    }

    const { subjectName, subjectCode, units, date, time, instructor, slots } =
      req.body;

    subject.subjectName = subjectName || subject.subjectName;
    subject.subjectCode = subjectCode || subject.subjectCode;
    subject.units = units || subject.units;
    subject.date = date || subject.date;
    subject.time = time || subject.time;
    subject.instructor = instructor || subject.instructor;
    subject.slots = slots || subject.slots;

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

app.get('/payment-booking/:username/payment-schedule', async (req, res) => {
  try {
    const paymentBooking = await PaymentBooking.find({
      username: req.params.username,
    });
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
      message: 'Error! Cannot delete subject.',
      error: error.message,
    });
  }
});

app.get('/admin/all-subjects', async (req, res) => {
  try {
    const result = await Subject.find();
    res.send(result);
  } catch (error) {
    res.status(400).json({
      message: 'Error fetching subjects',
      error: error.message,
    });
  }
});

app.get('/subject-registration/:username', async (req, res) => {
  try {
    const student = await Student.findOne({ username: req.params.username });

    if (!student) {
      return res.status(404).json({
        message: 'ERROR! Student not found.',
      });
    }
    res.status(200).json({
      student,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error fetching subjects',
      error: error.message,
    });
  }
});

app.patch('/subject-registration/:username', async (req, res) => {
  try {
    const student = await Student.findOne({ username: req.params.username });

    if (!student) {
      return res.status(404).json({
        message: 'ERROR! Student not found.',
      });
    }

    const { subjectName, subjectCode, units, date, time, instructor, slots } =
      req.body;

    const newSubject = {
      subjectName,
      subjectCode,
      units,
      date,
      time,
      instructor,
      slots,
    };

    student.subjects.push(newSubject);

    await student.save();

    return res.status(200).json({
      message: 'Subjects added successfully.',
      data: student,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Error updating student subjects',
      error: error.message,
    });
  }
});

app.delete('/subject-registration/:username', async (req, res) => {
  try {
    const student = await Student.findOne({ username: req.params.username });
    const { subjectCode } = req.body;

    if (!student) {
      return res.status(404).json({
        message: 'ERROR! Student not found.',
      });
    }

    const subjectIndex = student.subjects.findIndex(
      (subject) => subject.subjectCode === subjectCode
    );

    student.subjects.splice(subjectIndex, 1);
    await student.save();
    return res.status(200).json({
      message: 'Subject removed successfully.',
      data: student,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error! Cannot delete subject.',
      error: error.message,
    });
  }
});

app.listen(app.get('port'), () => {
  console.log(`App is listening to port ${app.get('port')}`);
});
