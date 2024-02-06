function validateStudentMiddleware(req, res, next) {
  const { firstName, lastName, course, email, username, accept } = req.body;

  if (!firstName || !lastName || !course || !email || !username || !accept) {
    res.status(400).json({
      errors: {
        firstName: 'First name is required',
        lastName: 'Last name is required',
        course: 'Please choose a course',
        email: 'Email is required',
        username: 'Username is required',
        accept: 'Please check the box to continue',
      },
    });
    return;
  }

  next();
}

export default validateStudentMiddleware;
