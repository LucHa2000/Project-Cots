const express = require("express");
const router = express.Router();
const db = require("../../config/db");
const Account = require("../models/Account");
const Posts = require("../models/Posts");
class NewsFeedController {
    index(req, res, next) {
        let username = req.cookies.username;
        db.execute(Account.findAll(), function(err, result) {
            if (err) throw err;
            db.execute(Posts.findPeopleFollow(username), (err, posts) => {
                res.render("user/newsfeed", { user: result, posts: posts });
            });
        });
    }
    post(req, res, next) {
        let username = req.cookies.username;
        let post_content = req.body.post_content;
        let post_status = 1;
        if (!req.file) {
            var post_img = req.body.img_old;
        } else {
            var post_img = req.file.path.split("\\").slice(3).join();
        }
        db.execute(Account.findByTag("username", username), (err, account) => {
            // userpost_img = account[0].avatar;
            db.execute(
                Posts.save(
                    username,
                    post_content,
                    post_status,
                    post_img,
                    account[0].avatar
                ),
                (err, result) => {
                    res.redirect("back");
                }
            );
        });
    }
}
module.exports = new NewsFeedController();