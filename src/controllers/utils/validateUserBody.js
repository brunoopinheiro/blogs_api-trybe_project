const Joi = require('joi');

const validateUserBody = (body) => Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  image: Joi.string(),
}).validate(body);

module.exports = { validateUserBody };