const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const isUser = await User.findOne({ email: req.body.email });
    if (isUser)
      return res.status(400).send({
        success: false,
        message: "User already exist",
      });
    const data = {
      ...req.body,
      password: await bcrypt.hash(req.body.password, 10),
    };
    const newUser = new User(data);
    const user = await newUser.save();
    res.send({
      success: true,
      user,
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).select(
      "+password"
    );
    if (!user)
      return res.status(401).send({
        success: false,
        message: "User doesn't exist",
      });
    const isMatch = bcrypt.compare(req.body.password, user.password);
    if (!isMatch)
      return res.status(401).send({
        success: false,
        message: "Wrong password",
      });
    const token = jwt.sign({ _id: user._id }, process.env.JWT_Secret);
    res
      .cookie("token", token,  { maxAge: 900000, httpOnly: true })
      .send({
        success: true,
        user,
      });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};
