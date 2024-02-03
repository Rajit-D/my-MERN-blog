const express = require("express");
const { testUser } = require("../controllers/user.controller.js");

const router = express.Router();

router.route("/test").get(testUser);

module.exports = router;
