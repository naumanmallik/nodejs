const { success } = require("../../../config/messages");

module.exports = {
  create: async (req, res, next) => {
    try {
      return res.json({
        status: 200,
        message: success,
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },
};
