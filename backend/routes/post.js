const { isAuthenticated } = require("../middlewares/auth");
const { createPost, updatePost, likesHandle, addComment, deleteComment, save, updateComment, deletePost, getPost, userPosts, explore, savedPosts, homePosts } = require("../controllers/post");

const router = require("express").Router();

router.route('/:postId').get(getPost)

router.route("/create").post(isAuthenticated, createPost);

router.route("/update/:postId").put(isAuthenticated, updatePost);

router.route("/userpost/:userId").get(isAuthenticated,userPosts)

router.route("/handlelike/:postId").put(isAuthenticated, likesHandle);

router.route("/addcomment/:postId").post(isAuthenticated, addComment).put(isAuthenticated,updateComment)

router.route("/removecomment/:postId").delete(isAuthenticated, deleteComment);

router.route("/handlesave/:postId").get(isAuthenticated, save);

router.route("/delete/:postId").delete(isAuthenticated,deletePost)

router.route("/get/explore").get(isAuthenticated,explore)

router.route("/get/saved").get(isAuthenticated,savedPosts)

router.route("/get/home").get(isAuthenticated,homePosts)


module.exports = router;
