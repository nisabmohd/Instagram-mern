const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema(
  {
    data: {
      type: String,
      require: true,
    },
    seen: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = new mongoose.model("story", StorySchema);
