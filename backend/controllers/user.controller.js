const { User } = require("../models/user.model");
const { errorHandler } = require("../utils/errorHandler.js");
const zod = require("zod");

const updateBody = zod.object({
  username: zod.string(),
  email: zod.string().email(),
  password: zod.string(),
});

const testUser = (req, res) => {
  res.json({
    message: "Hello world",
  });
};

const updateUser = async (req, res, next) => {
  const { success } = updateBody.safeParse(req.body);

  if (req.user.id !== req.params.userId)
    return next(errorHandler(403, "Unauthorized"));

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  console.log(req.user.id);
  if (req.user.id !== req.params.userId)
    return next(errorHandler(403, "Unauthorized"));
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("User deleted successfully ✅");
  } catch (error) {
    next(error);
  }
};

const signOut = async (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("User has been signed out successfully ✅");
  } catch (error) {
    next(error);
  }
};

module.exports = { testUser, updateUser, deleteUser, signOut };
