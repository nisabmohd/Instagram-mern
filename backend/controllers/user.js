const User = require("../models/User");

// get a user by username
exports.getUser = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) {
      return res.send({
        success: false,
        message: "No user found",
      });
    }
    res.send(user);
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.send({
        success: false,
        message: "No user found",
      });
    }
    res.send(user);
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

// follow/Unfollow user
exports.followHandle = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = req.user._id;
    const userdb = await User.findOne({ _id: user });
    if (userdb.followings.includes(userId)) {
      await User.updateOne({ _id: user }, { $pull: { followings: userId } });
      await User.updateOne({ _id: userId }, { $pull: { followers: user } });
    } else {
      await User.updateOne({ _id: user }, { $push: { followings: userId } });
      await User.updateOne({ _id: userId }, { $push: { followers: user } });
      await User.updateOne(
        { _id: userId },
        {
          $push: {
            notifications: {
              user: user,
              content: "Followed you",
              NotificationType: 3,
            },
          },
        }
      );
    }
    res.send({
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

// get followings list og a user
exports.getFollowings = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ _id: userId });
    let followings = [];
    Promise.all(
      user.followings.map(async (item) => {
        followings.push(await User.findOne({ _id: item.toString() }));
      })
    ).then(() => {
      res.send(followings);
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

// get followers list og a user
exports.getFollowers = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ _id: userId });
    let followers = [];
    Promise.all(
      user.followers.map(async (item) => {
        followers.push(await User.findOne({ _id: item.toString() }));
      })
    ).then(() => {
      res.send(followers);
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

// check user has unreadnotifications
exports.hasNotications = async (req, res) => {
  try {
    const user = req.user._id;
    const notificationsUser = await User.findOne(
      { _id: user },
      { notifications: { $elemMatch: { seen: false } } }
    );
    res.send({ notifications: notificationsUser.notifications !== undefined });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

// get all notifications of user
exports.notications = async (req, res) => {
  try {
    const user = req.user._id;
    const notifications = await User.findOne({ _id: user });
    console.log(notifications);
    const unSorted = notifications.notifications;
    res.send(unSorted.reverse());
  } catch (err) {
    console.log(err);
    res.send({
      success: false,
      message: err.message,
    });
  }
};

// update user
exports.updateUser = async (req, res) => {
  try {
    const user = req.user._id;
    const findUser = await User.findOne({ _id: user });
    console.log();
    res.send(
      await User.updateOne(
        { _id: user },
        { $set: { ...{ ...findUser }._doc, ...req.body } }
      )
    );
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

// search user
exports.search = async (req, res) => {
  try {
    const { text } = req.params;
    const result = await User.find({
      username: { $regex: text, $options: "i" },
    });
    res.send(result);
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

// forgot password

// add story

// get user story

// followings users story

// suggestions

// read unread notifications to read
