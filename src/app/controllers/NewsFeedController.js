const express = require("express");
const router = express.Router();
const db = require("../../config/db");
const Account = require("../models/Account");
const Posts = require("../models/Posts");
const Post_React = require("../models/Post_React");
class NewsFeedController {
    // newsfeed page
    index(req, res, next) {
            let username = req.cookies.username;
            db.execute(Posts.findPeopleFollow(username), (err, posts) => {
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
                        res.render("user/newsfeed", { posts: posts });
                    }
                );
            });
        }
        //posts
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