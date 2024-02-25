const express = require("express");
const {
  testUser,
  updateUser,
  deleteUser,
  signOut,
} = require("../controllers/user.controller.js");
const { verifyToken } = require("../utils/verifyUser.js");

const router = express.Router();

router.route("/test").get(testUser);
router.route("/update/:userId").put(verifyToken, updateUser);
router.route("/delete/:userId").delete(verifyToken, deleteUser);
router.route("/signout").post(signOut);

module.exports = router;
