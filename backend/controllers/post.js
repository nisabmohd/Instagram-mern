const Post = require("../models/Post");
const User = require("../models/User");
const { all } = require("../routes/post");

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.postId });
    if (!post)
      return res.send({
        success: false,
        message: "Post doesn't exist",
      });
    res.send(post);
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

exports.createPost = async (req, res) => {
  try {
    const post = new Post({ ...req.body, owner: req.user._id });
    const saved = await post.save();
    await User.updateOne(
      { _id: req.user._id },
      { $push: { posts: saved._id } }
    );
    res.send(saved);
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.postId });
    if (post.owner.toString() !== req.user._id.toString())
      return res.status(401).send({
        success: false,
        message: "forbidden",
      });
    await Post.deleteOne({ _id: req.params.postId });
    await User.updateOne(
      { _id: req.user._id },
      { $pull: { posts: req.params.postId } }
    );
    res.status(200).send({
      success: true,
      message: "done",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { caption } = req.body;
    if (!caption)
      return res.send({
        success: false,
        message: "Caption required",
      });
    const edited = await Post.updateOne(
      { _id: req.params.postId },
      { caption }
    );
    res.send({
      success: true,
      edited,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

exports.likesHandle = async (req, res) => {
  try {
    const user = req.user._id;
    const post = await Post.findOne({ _id: req.params.postId });
    if (!post)
      return res.send({
        success: false,
        message: "Post doesn't exist",
      });
    const likesArr = post.likes;
    if (likesArr.includes(user)) {
      const change = await Post.updateOne(
        { _id: req.params.postId },
        { $pull: { likes: user } }
      );
      return res.send(change);
    } else {
      const change = await Post.updateOne(
        { _id: req.params.postId },
        { $push: { likes: user } }
      );
      if (post.owner != user) {
        await User.updateOne(
          { _id: post.owner.toString() },
          {
            $push: {
              notifications: {
                user: user,
                content: "Liked your post",
                NotificationType: 1,
                postId: req.params.postId,
              },
            },
          }
        );
      }
      return res.send(change);
    }
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

exports.addComment = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.postId });
    if (!req.body.comment)
      return res.status(500).send({
        success: false,
        message: "Cant make an empty comment",
      });
    if (!post)
      return res.status(400).send({
        success: false,
        message: "Post doesn't exist",
      });
    const comment = await Post.updateOne(
      { _id: req.params.postId },
      { $push: { comments: { user: req.user._id, comment: req.body.comment } } }
    );
    if (post.owner != req.user._id)
      await User.updateOne(
        { _id: post.owner.toString() },
        {
          $push: {
            notifications: {
              user: req.user._id,
              content: `commented : ${req.body.comment} `,
              NotificationType: 2,
              postId: req.params.postId,
            },
          },
        }
      );
    res.send(comment);
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const comment = await Post.updateOne(
      { _id: req.params.postId, "comments._id": req.query.commentId },
      { $set: { "comments.$.comment": req.body.comment } }
    );
    res.send(comment);
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.postId });
    const commentId = req.query.commentId;
    if (!post)
      return res.status(400).send({
        success: false,
        message: "Post doesn't exist",
      });
    const deleted = await Post.updateOne(
      { _id: req.params.postId },
      { $pull: { comments: { _id: commentId } } }
    );
    res.send(deleted);
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

exports.save = async (req, res) => {
  try {
    const userFind = await User.findOne({ _id: req.user._id });
    const savedArr = userFind.saved;
    if (savedArr.includes(req.params.postId)) {
      await User.updateOne(
        { _id: req.user._id },
        { $pull: { saved: req.params.postId } }
      );
      await Post.updateOne(
        { _id: req.params.postId },
        { $pull: { saved: req.user._id } }
      );
      res.send({
        success: true,
      });
    } else {
      await User.updateOne(
        { _id: req.user._id },
        { $push: { saved: req.params.postId } }
      );
      await Post.updateOne(
        { _id: req.params.postId },
        { $push: { saved: req.user._id } }
      );
      res.send({
        success: true,
      });
    }
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

// users post
exports.userPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ owner: userId }).sort({ createdAt: -1 });
    res.send(posts);
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

// explore post
exports.explore = async (req, res) => {
  try {
    const posts = await Post.find({ owner: { $ne: req.user._id } }).sort({
      createdAt: -1,
    });
    res.send(posts);
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

// saved posts
exports.savedPosts = async (req, res) => {
  try {
    const findUser = await User.findOne({ _id: req.user._id });
    let savedPost = [];
    Promise.all(
      findUser.saved.map(async (item) => {
        savedPost.push(await Post.findOne({ _id: item }));
      })
    ).then(() => {
      res.send(savedPost.reverse());
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

// followings + my posts (home)
exports.homePosts = async (req, res) => {
  try {
    const userId = req.user._id;
    const posts = await Post.find({ owner: userId });
    const user = await User.findOne({ _id: userId });
    Promise.all(
      user.followings.map(async (item) => {
        posts.push(...(await Post.find({ owner: item })));
      })
    ).then(() => {
      const arr = posts.sort((a, b) => {
        return b.createdAt - a.createdAt;
      });
      res.send(arr);
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};
