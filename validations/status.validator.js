const Joi = require("joi");

const statusSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
});
module.exports = statusSchema;
