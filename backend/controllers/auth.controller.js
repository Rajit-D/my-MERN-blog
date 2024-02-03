const { User } = require("../models/user.model.js");
const zod = require("zod");
const { errorHandler } = require("../utils/errorHandler.js");

const signUpBody = zod.object({
  username: zod.string(),
  email: zod.string().email(),
  password: zod.string(),
});

const signUp = async (req, res, next) => {
  const { success } = signUpBody.safeParse(req.body);

  if (!success) next(errorHandler(400, "Invalid inputs! ⚠️"));

  const userExisting = await User.findOne({
    username: req.body.username,
  });

  if (userExisting)
    return res.status(411).json({
      message: "User already exists! ⚠️",
    });

  const newUser = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  await newUser.save();

  res.status(200).json({ message: "Sign up successful! ✅" });
};

module.exports = { signUp };
