const router = require("express").Router();

const { create } = require("../actions/post.add.action");

router.post("/create", create);

module.exports = router;
