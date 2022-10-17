const User = require("../models/User");

exports.getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ _id: userId });
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
              user: userId,
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

exports.notications = async (req, res) => {
  try {
    const user = req.user._id;
    const notifications = await User.findOne({ _id: user });
    res.send(notifications);
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};
