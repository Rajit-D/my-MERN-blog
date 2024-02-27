const { Post } = require("../models/post.model.js");
const { errorHandler } = require("../utils/errorHandler");

const create = async (req, res, next) => {
  // if (!req.body.isAdmin) return next(errorHandler(403, "User is not an Admin"));
  if (!req.body.title || !req.body.content)
    return next(errorHandler(400, "please provide all required fields"));

  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]/g, "-");

  const newPost = new Post({
    ...req.body,
    slug,
    user: req.user.id,
  });
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { create };
