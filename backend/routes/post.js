const { isAuthenticated } = require("../middleware/auth");

const router = require("express").Router();

router.post("/new", isAuthenticated, async (req, res) => {
  res.send({});
});

module.exports = router;
