var express = require("express");
var router = express.Router();
let multer = require("multer");
const upload = multer({
    dest: "src/public/uploads/",
});
const CrewController = require("../app/controllers/CrewController");
router.post("/add", upload.single("image"), CrewController.addCrew);
router.get("/:crew_name/delete", CrewController.deleteCrew);
router.get("/", CrewController.index);
module.exports = router;