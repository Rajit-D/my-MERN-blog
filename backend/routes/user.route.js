const express = require("express");
const { testUser } = require("../controllers/user.controller.js");
const { updateUser } = require("../controllers/user.controller.js");
const {verifyToken} = require("../utils/verifyUser.js");

const router = express.Router();

router.route("/test").get(testUser);
router.route("/update/:userId").put(verifyToken,updateUser);

module.exports = router;
