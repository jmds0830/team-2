import Session from '../models/SessionModel.js';

async function authenticateUser(req, res, next) {
  try {
    const { username } = req.body;

    let existingSession = await Session.findOne({ username });

    if (existingSession) {
      req.session = existingSession;
    } else {
      const newSession = new Session({
        username,
        createdAt: new Date(),
      });
      req.session = await newSession.save();
    }

    next();
  } catch (error) {
    res.status(400).json({
      message: 'Error! Cannot authenticate user.',
      error: error.message,
    });
  }
};

export default authenticateUser;
