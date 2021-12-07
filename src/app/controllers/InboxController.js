const express = require("express");
const router = express.Router();
const db = require("../../config/db");
const Account = require("../models/Account");
const Follow = require("../models/Followers");
const Crew = require("../models/Crews");
const Crew_members = require("../models/Crew_members");
class InboxController {
    //render ibr
    index(req, res, next) {
        let username = req.cookies.username;
        db.execute(Follow.findByTag("username", username), (err, result) => {
            db.execute(Crew.findByTag("admin", username), (err, crews) => {
                db.execute(
                    Crew_members.findByTag("member_username", username),
                    (err, followCrews) => {
                        console.log(result);
                        res.render("user/inbox", {
                            follower: result,
                            account: username,
                            followCrews: followCrews,
                            crews: crews,
                        });
                    }
                );
            });
        });
    }
    test(req, res, next) {
        res.render("user/inbox_test");
    }
}
module.exports = new InboxController();