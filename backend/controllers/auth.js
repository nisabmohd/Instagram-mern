const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Token = require("../models/AuthTokens");

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
    const access_token = jwt.sign({ _id: user._id }, process.env.JWT_Secret, {
      expiresIn: "30m",
    });
    const refresh_token = jwt.sign(
      { _id: user._id },
      process.env.JWT_Refresh_Secret
    );
    const refToken = new Token({
      token: refresh_token,
    });
    await refToken.save();
    res.send({
      success: true,
      user,
      access_token,
      refresh_token,
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
    const user = await User.findOne({
      $or: [{ email: req.body.text }, { username: req.body.text }],
    }).select("+password");
    if (!user)
      return res.status(401).send({
        success: false,
        message: "User doesn't exist",
      });
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch)
      return res.status(401).send({
        success: false,
        message: "Wrong password",
      });
    const access_token = jwt.sign({ _id: user._id }, process.env.JWT_Secret, {
      expiresIn: "30m",
    });
    const refresh_token = jwt.sign(
      { _id: user._id },
      process.env.JWT_Refresh_Secret
    );
    const refToken = new Token({
      token: refresh_token,
    });
    await refToken.save();
    user.password = undefined;
    res.send({
      success: true,
      user,
      access_token,
      refresh_token,
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

exports.tokenManage = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token)
      return res.status(400).send({
        success: false,
        message: "No Refresh Token Provided",
      });
    const isToken = await Token.findOne({ token });
    if (!isToken)
      return res.status(400).send({
        success: false,
        message: "Invalid Refresh Token",
      });
    const decode = jwt.verify(token, process.env.JWT_Refresh_Secret);
    const accessToken = jwt.sign({ _id: decode._id }, process.env.JWT_Secret, {
      expiresIn: "30m",
    });
    res.send({
      access_token: accessToken,
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    const { token } = req.body;
    res.send(await Token.deleteOne({ token }));
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};
