const express = require("express");
const {
  signUp,
  signIn,
  googleAuth,
} = require("../controllers/auth.controller.js");

const router = express.Router();

router.route("/signup").post(signUp);
router.route("/signin").post(signIn);
router.route("/google").post(googleAuth);

module.exports = router;
