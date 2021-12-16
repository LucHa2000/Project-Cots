const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "src/public/uploads/" });
const accountController = require("../app/controllers/AccountController");
const AdminController = require("../app/controllers/AdminController");
router.get("/addAccount", accountController.createAccount);
