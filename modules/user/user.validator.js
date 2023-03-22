const { body } = require("express-validator");
const {
  EMAIL_REGEX,
  PASSWORD_MIN_LENGTH,
} = require("../../config/constraints");
const {
  notEmpty,
  notPresent,
  invalidDataType,
  invalidFormat,
  invalidPasswordLength,
} = require("../../config/messages");

const UserSignUpPayloadValidation = [
  body("email")
    .exists()
    .withMessage(notPresent)
    .notEmpty()
    .withMessage(notEmpty)
    .isString()
    .withMessage(invalidDataType("String"))
    .matches(EMAIL_REGEX)
    .withMessage(invalidFormat("Email")),
  body("name")
    .exists()
    .withMessage(notPresent)
    .notEmpty()
    .withMessage(notEmpty)
    .isString()
    .withMessage(invalidDataType("String")),
  body("password")
    .exists()
    .withMessage(notPresent)
    .notEmpty()
    .withMessage(notEmpty)
    .isString()
    .withMessage(invalidDataType("String"))
    .isLength({ min: PASSWORD_MIN_LENGTH })
    .withMessage(invalidPasswordLength),
];

const UserLoginPayloadValidation = [
  body("email")
    .exists()
    .withMessage(notPresent)
    .notEmpty()
    .withMessage(notEmpty)
    .isString()
    .withMessage(invalidDataType("String"))
    .matches(EMAIL_REGEX)
    .withMessage(invalidFormat("Email")),
  body("password")
    .exists()
    .withMessage(notPresent)
    .notEmpty()
    .withMessage(notEmpty)
    .isString()
    .withMessage(invalidDataType("String"))
    .isLength({ min: PASSWORD_MIN_LENGTH })
    .withMessage(invalidPasswordLength),
];

module.exports = {
  UserSignUpPayloadValidation,
  UserLoginPayloadValidation,
};
