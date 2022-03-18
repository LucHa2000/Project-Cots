var express = require("express");
var router = express.Router();
let multer = require("multer");
const upload = multer({
    dest: "src/public/uploads/",
});
const authMiddlewares = require("../app/middlewares/AuthMiddlewares");
const siteController = require("../app/controllers/SiteController");

router.use("/", siteController.index);
module.exports = router;