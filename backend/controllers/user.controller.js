const { User } = require("../models/user.model");
const { errorHandler } = require("../utils/errorHandler");
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
          password: req.body.password,
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

module.exports = { testUser, updateUser };
