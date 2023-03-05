require('dotenv/config');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
const { User } = require('../models');

async function getUsers() {
  const user = await User.findAll();
  return user;
}

async function getByUserId(userId) {
  const user = await User.findByPk(userId);
  return user;
}

async function getByUserEmail(email) {
  const user = await User.findOne({ where: { email } });
  return user;
}

async function createUser({ displayName, email, password, image }) {
  const isNotUnique = await getByUserEmail(email);
  if (isNotUnique) {
    return {
      error: { status: 409, message: 'User already registered' },
    };
  }

  const newUser = await User.create({ displayName, email, password, image });
  return newUser;
}

async function login(email, password) {
  const user = await getByUserEmail(email);

  if (!user || user.password !== password) {
    return { error: {
        code: 'invalidFields',
        message: 'Invalid fields',
      },
    };
  }

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const payload = { displayName: user.displayName, email };
  const token = jwt.sign(payload, secret, jwtConfig);

  return { token };
}

module.exports = {
  createUser,
  getUsers,
  getByUserId,
  getByUserEmail,
  login,
};