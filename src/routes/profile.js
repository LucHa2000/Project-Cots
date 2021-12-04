var express = require("express");
var router = express.Router();
let multer = require("multer");
const upload = multer({
    dest: "src/public/uploads/",
});
const profileController = require("../app/controllers/ProfileController");
router.get("/editPage", profileController.editPage);
router.post("/update", upload.single("image"), profileController.update);
router.use("/", profileController.index);
module.exports = router;