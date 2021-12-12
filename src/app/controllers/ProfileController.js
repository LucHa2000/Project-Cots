const express = require("express");
const router = express.Router();
var moment = require("moment");
const db = require("../../config/db");
const Accounts = require("../models/Account");
const Posts = require("../models/Posts");

class ProfileController {
    index(req, res, next) {
        db.execute(
            Accounts.findByTag("username", req.cookies.username),
            (err, result) => {
                db.execute(
                    Posts.findByTag("username", req.cookies.username),
                    (err, myPosts) => {
                        res.render("user/profile", { account: result[0], posts: myPosts });
                    }
                );
            }
        );
    }
    editPage(req, res, next) {
        db.execute(
            Accounts.findByTag("username", req.cookies.username),
            (err, result) => {
                res.render("user/edit_profile", { account: result[0] });
            }
        );
    }
    update(req, res, next) {
        let username = req.cookies.username;
        let password = req.body.password;
        let bio = req.body.bio;
        let job = req.body.job;
        let email = req.body.email;
        let last_name = req.body.last_name;
        let first_name = req.body.first_name;
        let birthday = moment(req.body.birthday).format("YYYY-MM-DD");
        if (!req.file) {
            var avatar = req.body.img_old;
        } else {
            var avatar = req.file.path.split("\\").slice(3).join();
        }

        db.execute(
            Accounts.updateAccount(
                username,
                password,
                email,
                first_name,
                last_name,
                birthday,
                bio,
                job,
                avatar
            ),
            (err, result) => {
                res.redirect("back");
            }
        );
    }
}
module.exports = new ProfileController();