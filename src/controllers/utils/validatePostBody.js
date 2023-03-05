const Joi = require('joi');

const validatePostBody = (body) => Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().required(),
}).validate(body);

const validateUpdatePostBody = (body) => Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
}).validate(body);

module.exports = { validatePostBody, validateUpdatePostBody };