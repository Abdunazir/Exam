const Joi = require("joi");

const operationSchema = Joi.object({
  order_id: Joi.number(),
  status_id: Joi.number(),
//   operation_date,
  admin_id: Joi.number(),
  description: Joi.string().required(),
});

module.exports = operationSchema;
