import bcrypt from 'bcryptjs';
import Student from '../models/StudentRegisterModel.js';

async function validateLoginMiddleware(req, res, next) {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({
      errors: {
        username: 'Username is required',
        password: 'Password is required',
      },
    });
    return;
  }

  try {
    const student = await Student.findOne({ username });

    if (!student) {
      res.status(400).json({ message: 'Invalid username or password.' });
      return;
    }

    const isPasswordHashed = student.isPasswordHashed || false;

    if (!isPasswordHashed) {
      if (password !== student.password) {
        res.status(400).json({ message: 'Invalid username or password.' });
        return;
      }
    } else {
      const isPasswordCorrect = await bcrypt.compare(password, student.password);
      if (!isPasswordCorrect) {
        res.status(400).json({ message: 'Invalid username or password.' });
        return;
      }
    }
    
    req.student = student;
    next();
  } catch (error) {
    console.error('Error validating login:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}

export default validateLoginMiddleware;
