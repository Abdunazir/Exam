const admin = require("./admin.validator");
const operation = require("./operation.validator");
const order = require("./order.validator");
const status = require("./status.validator");
const currency_type = require("./current_type.validator");
const loginCheck = require("./author_email_pass.validator");

module.exports = {
  admin,
  operation,
  order,
  status,
  currency_type,
  loginCheck,
};
