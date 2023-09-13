const { body } = require("express-validator"); // middleware function

const validatorScheme = () =>
  body(["name", "price", "description"])
    .notEmpty()
    .withMessage("data is required");

module.exports ={
    validatorScheme
} 