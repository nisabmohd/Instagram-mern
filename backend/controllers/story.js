const Story = require("../models/Story");
const { v4: id } = require("uuid");
const User = require("../models/User");

exports.getStory = async (req, res) => {
  try {
    if (req.query.highlight === "true") {
      const story = await Story.findOne({ id: req.params.id });
      return res.send(story);
    }
    const story = await Story.findOne({
      $and: [
        { id: req.params.id },
        { createdAt: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) } },
      ],
    });
    res.send(story);
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

exports.userStory = async (req, res) => {
  try {
    const stories = await Story.find({
      $and: [
        { owner: req.params.uid },
        { createdAt: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) } },
      ],
    });
    res.send(stories);
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

exports.newStory = async (req, res) => {
  try {
    const newStory = new Story({
      id: id(),
      owner: req.user._id,
      data: req.body.data,
      seen: [],
    });
    const story = await newStory.save();
    res.send(story);
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

exports.addSeen = async (req, res) => {
  try {
    const story = await Story.findOne({ id: req.params.id });
    if (story.id === req.user._id)
      return res.send({ success: false, message: "Unsupported" });
    if (story?.seen?.includes(req.user._id))
      return res.send({ success: false, message: "Unsupported" });
    Story.updateOne(
      { id: req.params.id },
      { $push: { seen: req.user._id } }
    ).then(() => {
      res.send({
        success: true,
        message: "done",
      });
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

exports.homeStory = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    const allStories = [];
    Promise.all(
      user.followings.map(async (item) => {
        const t = await Story.find({
          $and: [
            { owner: item },
            { createdAt: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) } },
          ],
        });
        if (t.length != 0) allStories.push(t);
      })
    ).then(() => {
      res.send(allStories);
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

// addHighlight

// removeHighlight

// viewHighlight
