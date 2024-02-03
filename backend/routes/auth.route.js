const express = require("express");
const { signUp } = require("../controllers/auth.controller.js");

const router = express.Router();

router.route("/signup").post(signUp);

module.exports = router;
