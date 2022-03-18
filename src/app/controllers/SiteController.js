const express = require("express");
const router = express.Router();
const db = require("../../config/db");
class SiteController {
    index(req, res, next) {
            res.render("user/home");
        }

}
module.exports = new SiteController();