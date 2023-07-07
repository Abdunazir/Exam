const Joi = require("joi");

const current_typeSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
});
module.exports = current_typeSchema;
