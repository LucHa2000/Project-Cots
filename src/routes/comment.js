var express = require("express");
var router = express.Router();
const postsController = require("../app/controllers/PostController");
router.post("/:comment_id/reply", postsController.replyComment);
router.post("/:post_id", postsController.postComment);
module.exports = router;