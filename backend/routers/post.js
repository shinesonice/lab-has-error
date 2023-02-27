const router = require("express").Router();

const PostController = require("../controllers/post");

router.post("/create-post", PostController.postAddPost);
router.get("/posts", PostController.getPosts);
router.get("/post/:postId", PostController.getPost);
router.post("/update-post", PostController.postUpdatePost);
router.post("/delete-post", PostController.deletePost);

module.exports = router;
