const jwt = require("jsonwebtoken");

exports.isAuthenticated = async (req, res, next) => {
  const auth = req.headers["authorization"];
  const token = auth && auth.split(" ")[1];
  if (!token)
    return res.status(401).send({
      sucess: false,
      message: "Unauthorised",
    });
  const decoded = jwt.verify(token, process.env.JWT_Secret);
  req.user=decoded
  next();
};
