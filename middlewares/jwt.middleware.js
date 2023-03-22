const router = require("express").Router();
const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const User = require("../modules/user/user.schema");
const {
  noToken,
  invalidToken,
  invalidSignature,
} = require("../config/messages");
const { JWT_SECRET } = process.env;

router.use(async function (req, res, next) {
  try {
    if (req.path.search("/auth") > -1 || req.path.search("/public") > -1) {
      return next();
    } else {
      const token = req.header("authorization")?.trim()?.split(" ")?.pop();
      if (token) {
        const decode = JWT.verify(token, JWT_SECRET);
        const user = await User.findById(decode.id);
        if (user) {
          req.user = user;
          return next();
        } else {
          next(createError(401, invalidToken));
        }
      }
      next(createError(401, noToken));
    }
  } catch (error) {
    next(createError(401, invalidSignature));
  }
});

module.exports = router;
