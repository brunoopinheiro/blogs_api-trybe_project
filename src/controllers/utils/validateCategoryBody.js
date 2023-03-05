const Joi = require('joi');

const validateCategoryBody = (body) => Joi.object({
  name: Joi.string().required(),
}).validate(body);

module.exports = { validateCategoryBody };