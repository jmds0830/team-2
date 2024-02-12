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

  next();
}

export default validateLoginMiddleware;