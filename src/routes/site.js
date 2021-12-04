var express = require("express");
var router = express.Router();
let multer = require("multer");
const upload = multer({
    dest: "src/public/uploads/",
});
const authMiddlewares = require("../app/middlewares/AuthMiddlewares");
const siteController = require("../app/controllers/SiteController");
router.use("/error", siteController.error);
router.post("/find", siteController.find);
router.use("/pageSearch/:name", siteController.pageSearch);
router.get("/follow/:follower", siteController.follow);
router.get("/unfollow/:follower", siteController.unfollow);
router.use("/", siteController.index);
module.exports = router;