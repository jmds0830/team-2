import Student from '../models/StudentRegisterModel.js';

function validateLoginMiddleware(req, res, next) {
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

  Student.findOne({ username })
    .then((student) => {
      if (!student) {
        res.status(400).json({ message: 'Invalid username or password.' });
        return;
      }

      if (password !== student.password) {
        res.status(400).json({ message: 'Invalid username or password.' });
        return;
      }

      req.student = student;
      next();
    })
    .catch((err) => {
      res.status(500).json({ message: 'Internal server error.' });
    });
}

export default validateLoginMiddleware;
