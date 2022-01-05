var express = require("express");
var router = express.Router();
let multer = require("multer");
const upload = multer({ dest: "src/public/uploads/" });
const adminController = require("../app/controllers/AdminController");
const accountController = require("../app/controllers/AccountController");

router.use("/account/delete/:username", accountController.deleteAccount);
router.get("/:username", accountController.updateAccountPage);
router.get("/:status/:username", accountController.changeAccountStatus);
router.post(
    "/:username/edit",
    upload.single("image"),
    accountController.updateAccount
);
router.post("/register", accountController.createAccount);
router.get("/", adminController.index);
module.exports = router;