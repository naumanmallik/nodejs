const User = require("../user.schema");
const {
  created,
  invalidLogin,
  userNotFound,
} = require("../../../config/messages");
const createError = require("http-errors");
const { emailExists, signedIn } = require("../../../config/messages");
const { sendEmail } = require("../../../libs/email_service.lib");

module.exports = {
  signup: async (req, res, next) => {
    const { body: payload } = req;
    try {
      let user;
      user = await User.findOne({ email: payload.email });

      if (user) {
        throw createError(400, emailExists);
      }
      user = await User.create(payload);
      const token = user?.getJWTToken();
      user._doc["token"] = token;
      sendEmail(user);
      return res.json({
        status: 200,
        message: created("User"),
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    const { body: payload } = req;
    try {
      const user = await User.findOne({ email: payload.email });
      if (!user) {
        throw createError(404, userNotFound);
      }

      const verifyPassword = await user.verifyPassword(
        payload.password,
        user.password
      );
      if (!verifyPassword) {
        throw createError(401, invalidLogin);
      }

      const token = user?.getJWTToken();
      user._doc["token"] = token;

      return res.json({
        status: 200,
        message: signedIn,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
};
