const express = require("express");
const { verifyToken } = require("../utils/verifyUser.js");
const { create } = require("../controllers/post.controller.js");

const router = express.Router();

router.route("/create").post(verifyToken, create);

module.exports = router;
