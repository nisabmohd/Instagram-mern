const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    const post = new Post({ ...req.body, owner: req.user._id });
    const saved = await post.save();
    res.send(saved);
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};
