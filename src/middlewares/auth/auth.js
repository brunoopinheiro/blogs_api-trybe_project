const jwt = require('jsonwebtoken');
require('dotenv/config');

const secret = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    const e = new Error('Token not found');
    return res.status(401).json({ message: e.message });
  }

  try {
    const payload = jwt.verify(token, secret);
    
    req.user = payload;

    return next();
  } catch (error) {
    error.statusCode = 401;
    error.message = 'Expired or invalid token';
    return res.status(error.statusCode).json({ message: error.message });
  }
};