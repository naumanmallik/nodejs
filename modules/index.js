const router = require("express").Router();

router.use("/user", require("./user/routes/user.route"));
router.use("/post", require("./post/routes/post.route"));

module.exports = router;
