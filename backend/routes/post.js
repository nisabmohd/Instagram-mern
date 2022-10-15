const { isAuthenticated } = require("../middlewares/auth");
const {createPost}=require('../controllers/post')

const router = require("express").Router();

router.route('/create').post(isAuthenticated,createPost,)

module.exports = router;
