const { User } = require('../models');

function createUser({ displayName, email, password, image }) {
  return User.create({ displayName, email, password, image });
}

function getUsers() {
  return User.findAll();
}

function getByUserId(userId) {
  return User.findByPk(userId);
}

module.exports = {
  createUser,
  getUsers,
  getByUserId,
};