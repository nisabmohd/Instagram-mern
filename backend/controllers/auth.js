const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Token = require("../models/AuthTokens");
const axios = require("axios");
const qs = require("qs");
const fs = require("fs");

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
    });
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

exports.googleoauth = async (req, res) => {
  try {
    const { id_token, access_token } = await getUserFromCode(req.query.code);
    const user = await userDetails(access_token, id_token);
    let isUser = await User.findOne({ email: user.email });
    if (!isUser) {
      const temp = new User({
        username: user.name.split(" ").join(""),
        name: user.name,
        email: user.email,
        avatar: user.picture,
      });
      isUser = temp.save();
    }
    const access_token_server = jwt.sign(
      { _id: isUser._id },
      process.env.JWT_Secret,
      {
        expiresIn: "30m",
      }
    );
    const refresh_token_server = jwt.sign(
      { _id: isUser._id },
      process.env.JWT_Refresh_Secret
    );
    const refToken = new Token({
      token: refresh_token_server,
    });
    await refToken.save();
    const options = {
      success: true,
      access_token_server,
      refresh_token_server,
    };
    res.redirect(
      `${process.env.CLIENT_URL}/oauth/redirect?uid=${isUser._id}&access_token=${access_token_server}&refresh_token=${refresh_token_server}`
    );
  } catch (err) {
    console.log(err);
    res.send("Something unexpected happened.");
  }
};

async function getUserFromCode(code) {
  const url = "https://oauth2.googleapis.com/token";
  const values = {
    code,
    client_id: process.env.clientid,
    client_secret: process.env.clientsecret,
    redirect_uri: process.env.redirect_url,
    grant_type: "authorization_code",
  };

  try {
    const res = await axios.post(url, qs.stringify(values), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
    // throw new Error(error);
  }
}

async function userDetails(access_token, id_token) {
  return axios
    .get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => {
      console.error(`Failed to fetch user`);
      throw new Error(error.message);
    });
}
