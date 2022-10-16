const { isAuthenticated } = require("../middlewares/auth");
const { createPost, updatePost, likesHandle, addComment, deleteComment, save, updateComment, deletePost, getPost } = require("../controllers/post");

const router = require("express").Router();

router.route('/:postId').get(getPost)

router.route("/create").post(isAuthenticated, createPost);

router.route("/update/:postId").put(isAuthenticated, updatePost);

router.route("/handlelike/:postId").put(isAuthenticated, likesHandle);

router.route("/addcomment/:postId").post(isAuthenticated, addComment).put(isAuthenticated,updateComment)

router.route("/removecomment/:postId").delete(isAuthenticated, deleteComment);

router.route("/save/:postId").get(isAuthenticated, save);

router.route("/delete/:postId").delete(isAuthenticated,deletePost)

module.exports = router;
