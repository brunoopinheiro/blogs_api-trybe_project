const Joi = require('joi');

const validateLogin = (body) => Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).validate(body);

module.exports = { validateLogin };