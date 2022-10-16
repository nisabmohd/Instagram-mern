const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "Enter Username"],
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    require: [true, "Enter email"],
  },
  avatar: String,
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  password: {
    type: String,
    require: [true, "Enter Password"],
    minLength: 6,
    select: false,
  },
  followings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  saved: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  bio: {
    type: String,
    maxLength: 300,
  },
  website: String,

  notifications: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      NotificationType: Number,
      content: String,
      seen: {
        type: Boolean,
        default: false,
      },
    },
  ],
  hasNotifications: {
    type: Boolean,
    default: false,
  },
  conversations: [
    {
      roomId: {
        type: String,
      },
      people: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
  ],
});

module.exports = new mongoose.model("User", userSchema);
