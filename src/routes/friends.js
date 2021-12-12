var express = require("express");
var router = express.Router();
const friendsfeedController = require("../app/controllers/FriendsController");
router.get("/", friendsfeedController.index);
router.get("/:username", friendsfeedController.inforFriends);
module.exports = router;