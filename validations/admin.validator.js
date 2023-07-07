const Joi = require("joi");

const adminSchema = Joi.object({
  full_name: Joi.string().required(),
  user_name: Joi.string().required(),
  hashed_password: Joi.string().required().min(8),
  phone_number: Joi.string(),
  email: Joi.string().email(),
  tg_link: Joi.string(),
  hashed_token: Joi.string(),
  is_creator: Joi.boolean().default(false),
  is_active: Joi.boolean().default(true),
  description: Joi.string(),
});
module.exports = adminSchema;
