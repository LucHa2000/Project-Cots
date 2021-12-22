var express = require("express");
var router = express.Router();
const postsController = require("../app/controllers/PostController");
router.use("/:post_id/delete", postsController.deletePost);
router.use("/react/:icon_id/:post_id", postsController.postReact);
router.use("/:post_id/edit", postsController.pageEdit);
router.use("/:post_id/switch", postsController.switchPost);
router.use("/:post_id", postsController.detailPost);
router.use("/", postsController.index);

module.exports = router;