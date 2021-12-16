const express = require("express");
const router = express.Router();
var moment = require("moment");
const db = require("../../config/db");
const Accounts = require("../models/Account");
const Posts = require("../models/Posts");
const Post_React = require("../models/Post_React");
class ProfileController {
    index(req, res, next) {
        let username = req.cookies.username;
        db.execute(Posts.findByTag("username", username), (err, posts) => {
            db.execute(
                Post_React.findReactByUsername(username),
                (err, postWithReacts) => {
                    posts.forEach((post) => {
                        postWithReacts.forEach((postReact) => {
                            if (
                                postReact.username == username &&
                                post.post_id == postReact.post_id
                            ) {
                                post.react_img = postReact.icon_id;
                            }
                        });
                    });
                    // console.log(posts);
                    res.render("user/profile", { posts: posts });
                }
            );
        });
    }
    editPage(req, res, next) {
        let username = req.cookies.username;
        db.execute(Accounts.findByTag("username", username), (err, result) => {
            res.render("user/edit_profile", { account: result[0] });
        });
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