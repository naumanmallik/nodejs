const router = require("express").Router();
const { signup, login } = require("../actions/user.auth.action");
const {
  UserSignUpPayloadValidation,
  UserLoginPayloadValidation,
} = require("../user.validator");
const { request } = require("../../../middlewares/validation.middleware");

router.post("/auth/signup", UserSignUpPayloadValidation, request, signup);
router.post("/auth/login", UserLoginPayloadValidation, request, login);

module.exports = router;
