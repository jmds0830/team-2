import app from './app.js';
import express from 'express';
import process from 'node:process';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import Student from './models/StudentRegisterModel.js';
import validateStudentMiddleware from './middlewares/validateStudentMiddleware.js';

const PORT = process.env.PORT || 3000;

await mongoose.connect('mongodb://127.0.0.1:27017/ensys');

app.set('port', PORT);
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.post('/register', validateStudentMiddleware, async (req, res) => {
  try {
    const { firstName, lastName, course, email, username } = req.body;
    const newStudent = new Student({
      firstName,
      lastName,
      course,
      email,
      username,
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

app.listen(app.get('port'), () => {
  console.log(`App is listening to port ${app.get('port')}`);
});
