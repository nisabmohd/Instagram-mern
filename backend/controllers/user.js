const User = require("../models/User");
const bcrypt = require('bcrypt')
const { SendMail } = require('../utils/mail')
const { v4: uid } = require('uuid')
const ResetTokens = require('../models/ResetTokens')

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
    const user = req.user._id;
    const { text } = req.params;
    const result = await User.find({
      username: { $regex: text, $options: "i" },
    });
    res.send(result.filter(item => item._id.toString() !== user))
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};


// suggestions
exports.suggestions = async (req, res) => {
  try {
    const notFollowed = await User.find({
      $and: [
        { followers: { $ne: req.user._id } },
        { _id: { $ne: req.user._id } }
      ]
    })
      .limit(parseInt(req.query.limit ?? 5))
    res.send(notFollowed)
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message,
    });
  }
}

//change password
exports.changePassword = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id }).select("+password");
    const isCorrect = await bcrypt.compare(req.body.password, user.password)
    if (!isCorrect) return res.status(400).send({
      message: 'Current password is wrong'
    })
    if (req.body.newPassword !== req.body.confirmPassword) return res.status(400).send({
      message: 'Confirm password and new password doesnt match'
    })
    const updated = await User.updateOne({ _id: req.user._id }, { $set: { password: bcrypt.hashSync(req.body.newPassword, 10) } })
    res.send({
      success: true,
      message: "Updated password",
    })
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message,
    });
  }
}


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: `${req.user._id}` } })
    res.send(users)
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message,
    });
  }
}


// forgot password
exports.resetPassword = async (req, res) => {
  try {
    const user = await User.findOne({
      $or: [{ email: req.body.text }, { username: req.body.text }],
    })
    if (!user) return res.status(400).json({ success: false, message: "No user found" })
    const token = uid()
    const prevToken = await ResetTokens.findOne({ email: user.email })
    if (prevToken) {
      await ResetTokens.updateOne({ email: user.email }, { $set: { token: token } })
    } else {
      const newTokenSave = new ResetTokens({
        token, email: user.email
      })
      await newTokenSave.save()
    }
    await SendMail(`${process.env.CLIENT_URL}/reset/${token}`, user.email)
    res.json({ success: true, message: 'Reset link sent to email' })
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message,
    });
  }
}


exports.checkResetToken = async (req, res) => {
  try {
    const tokenDoc = await ResetTokens.findOne({ token: req.params.token })
    if (!tokenDoc) return res.status(400).json({ success: false, message: 'Invalid Link' })
    const now = Date.now();
    const createdAt = Date.parse(tokenDoc.updatedAt);
    const oneDay = 24 * 60 * 60 * 1000;
    const isMoreThanADay = (now - createdAt) > oneDay;
    if (isMoreThanADay) return res.status(400).json({ success: false, message: 'Link Expired' })
    res.json({ success: true })
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message,
    });
  }
}


exports.handleNewPassword = async (req, res) => {
  try {
    const { token, password } = req.body
    const tokenDoc = await ResetTokens.findOne({ token })
    if (!tokenDoc) return res.status(400).json({ success: false, message: 'Something went wrong' })
    User.updateOne({ email: tokenDoc.email }, { $set: { password: bcrypt.hashSync(password, 10) } }).then(() => {
      return ResetTokens.deleteOne({ token })
    }).then(() => {
      res.json({ success: true })
    })
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message,
    });
  }
}

// read unread notifications to read
