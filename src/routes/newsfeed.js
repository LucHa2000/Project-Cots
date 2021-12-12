var express = require("express");
var router = express.Router();
let multer = require("multer");
const upload = multer({
    dest: "src/public/uploads/",
});
const newsfeedController = require("../app/controllers/NewsFeedController");
// router.post('/search',accountController.search)
router.post("/newPost", upload.single("image"), newsfeedController.post);
router.get("/", newsfeedController.index);

module.exports = router;