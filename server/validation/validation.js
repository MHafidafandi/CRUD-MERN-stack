const { body, check } = require("express-validator");

const validate = (next) => {
  body("email").isEmail();
  check("password", "must be at least 8 chars long").isLength({ min: 8 });
  next;
};

module.exports = validate;
