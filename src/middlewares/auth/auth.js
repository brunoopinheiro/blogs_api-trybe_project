const jwt = require('jsonwebtoken');
require('dotenv/config');

const secret = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    const e = new Error('Token not found');
    e.statusCode = 401;
    return next(e);
  }

  try {
    const payload = jwt.verify(token, secret);
    
    req.user = payload;

    return next();
  } catch (error) {
    error.statusCode = 401;
    return next(error);
  }
};