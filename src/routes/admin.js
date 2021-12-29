var express = require("express");
var router = express.Router();
const adminController = require("../app/controllers/AdminController");
const accountController = require("../app/controllers/AccountController");
router.get("/", adminController.index);
router.get("/:username", accountController.updateAccountPage);
module.exports = router;
router.get("/:status/:username", accountController.changeAccountStatus);
