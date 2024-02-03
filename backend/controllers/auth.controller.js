const {User} = require("../models/user.model.js");
const zod = require("zod");

const signUpBody = zod.object({
  username: zod.string(),
  email: zod.string().email(),
  password: zod.string(),
});

const signUp = async (req, res) => {
  const { success } = signUpBody.safeParse(req.body);

  if (!success)
    return res.status(411).json({
      message: "Incorrect fields! ⚠️",
    });

  const userExisting = await User.findOne({
    username: req.body.username,
  });

  console.log(userExisting);

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