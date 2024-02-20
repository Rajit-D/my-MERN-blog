const { User } = require("../models/user.model.js");
const zod = require("zod");
const { errorHandler } = require("../utils/errorHandler.js");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const signUpBody = zod.object({
  username: zod.string(),
  email: zod.string().email(),
  password: zod.string(),
});

const signInBody = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});

const signInWithGoogle = zod.object({
  username: zod.string(),
  email: zod.string().email(),
  profilePicture: zod.string(),
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

const signIn = async (req, res, next) => {
  const { success } = signInBody.safeParse(req.body);

  if (!success) return next(errorHandler(400, "Invalid inputs! ⚠️"));

  const userValid = await User.findOne({
    email: req.body.email,
  });
  if (!userValid) return next(errorHandler(400, "User not found! ⚠️"));

  const passwordValid = await User.findOne({
    password: req.body.password,
  });
  if (!passwordValid) return next(errorHandler(400, "Incorrect password! ⚠️"));

  const token = jwt.sign({ id: userValid._id }, "secret");
  const { password: password, ...rest } = userValid._doc;

  res
    .status(200)
    .cookie("access_token", token, { httpOnly: true })
    .json({ message: "Sign in successful! ✅", rest });
};

const googleAuth = async (req, res, next) => {
  const { success } = signInWithGoogle.safeParse(req.body);
  if (!success) next(errorHandler(400, "Invalid inputs! ⚠️"));

  try {
    const userExisting = await User.findOne({
      email: req.body.email,
    });

    if (userExisting) {
      const token = jwt.sign({ id: userExisting._id }, "secret");
      const { password: password, ...rest } = userExisting._doc;

      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json({ message: "Sign in successful! ✅", rest });
    } else {
      const newPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(newPassword, 10);

      const newUser = new User({
        username:
          req.body.username.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        password: hashedPassword,
        email: req.body.email,
        profilePicture: req.body.profilePicture,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, "secret");

      const { password: password, ...rest } = newUser._doc;

      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json({ message: "Sign in successful! ✅", rest });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { signUp, signIn, googleAuth };
