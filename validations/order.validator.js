const Joi = require("joi");

const orderSchema = Joi.object({
  full_name: Joi.string().required(),
  phone_number: Joi.string().required(),
  product_link: Joi.string().required(),
  summa: Joi.number().required(),
  currency_type_id: Joi.number(),
  truck: Joi.string().required(),
  email: Joi.string().email(),
  description: Joi.string(),
});
module.exports = orderSchema;
