const express = require("express");
const {
  testUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller.js");
const { verifyToken } = require("../utils/verifyUser.js");

const router = express.Router();

router.route("/test").get(testUser);
router.route("/update/:userId").put(verifyToken, updateUser);
router.route("/delete/:userId").delete(verifyToken, deleteUser);

module.exports = router;
