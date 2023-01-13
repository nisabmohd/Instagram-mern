const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "Enter Username"],
    unique: [true, "Username already exist"],
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    require: [true, "Enter email"],
    unique: [true, "User with email already exist"],
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
    minLength: 6,
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
    maxLength: 150,
  },
  website: String,

  notifications: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      // 1 -> like
      // 2 -> comment
      // 3 -> follow
      NotificationType: Number,
      content: String,
      seen: {
        type: Boolean,
        default: false,
      },
      postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        default: undefined,
      },
      time: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  private: {
    type: Boolean,
    default: false,
  },
  requestSent: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  requestReceived: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  highlights: [
    {
      stories: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Story",
        },
      ],
      name: {
        type: String,
        required: true,
      },
    },
  ],
  online: {
    type: Boolean,
    default: false,
  },
  lastSeen: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = new mongoose.model("User", userSchema);
