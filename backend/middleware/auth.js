const jwt = require("jsonwebtoken");

exports.isAuthenticated = async (req, res, next) => {
  const token = req.cookies;
  if (!token)
    return res.status(401).send({
      sucess: false,
      message: "Unauthorised",
    });
  const decoded = jwt.verify(token, process.env.JWT_Secret);
  console.log(decoded);
  next()
};
