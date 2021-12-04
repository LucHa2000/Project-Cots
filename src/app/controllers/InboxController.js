const express = require("express");
const router = express.Router();
const db = require("../../config/db");
const Account = require("../models/Account");
const Follow = require("../models/Followers");
const Crew = require("../models/Crews");
class InboxController {
    //render ibr
    index(req, res, next) {
        let username = req.cookies.username;
        db.execute(Follow.findByTag("username", username), (err, result) => {
            db.execute(Crew.findByTag("admin", username), (err, crews) => {
                res.render("user/inbox", {
                    follower: result,
                    account: username,
                    crews: crews,
                });
            });
        });
    }
    test(req, res, next) {
        res.render("user/inbox_test");
    }
}
module.exports = new InboxController();