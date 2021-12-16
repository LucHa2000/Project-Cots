const express = require("express");
const router = express.Router();
const db = require("../../config/db");
const Account = require("../models/Account");
const Posts = require("../models/Posts");
const Post_React = require("../models/Post_React");
class PostsController {
    index(req, res, next) {}
        //delete post
        // route : /post/delete/:post_id
    deletePost(req, res, next) {
            let postId = req.params.post_id;
            db.execute(Posts.delete(postId), (err, result) => {
                res.redirect("back");
            });
        }
        //render edit post
        //route : /post/pageEdit/:post_id
    pageEdit(req, res, next) {
            let postId = req.params.post_id;
            db.execute(Posts.findByTag("post_id", postId), (err, result) => {
                console.log(result[0]);
                res.render("user/edit_post", { post: result[0] });
            });
        }
        //post react : heart
        //route : /post/react/:post_id
    postReact(req, res, next) {
        let postId = req.params.post_id;
        let username = req.cookies.username;
        let icon_id = req.params.icon_id; // heart : id = 1
        db.execute(Post_React.findReact(postId, username), (err, result) => {
            if (result.length > 0) {
                // if react exsist input same
                if (result[0].icon_id == icon_id) {
                    db.execute(
                        Post_React.delete(postId, username, icon_id),
                        (err, result) => {
                            // - 1 countReact
                            db.execute(Posts.updateCountReact(postId, -1), (err, result) => {
                                res.redirect("back");
                            });
                        }
                    );
                    // if react exsist and input not same
                } else if (result[0].icon_id != icon_id) {
                    db.execute(
                        Post_React.updateReact(postId, username, icon_id),
                        (err, result) => {
                            res.redirect("back");
                        }
                    );
                }
            }
            // if react not exsist
            else {
                // + 1 countReact
                db.execute(Posts.updateCountReact(postId, 1), (err, result) => {
                    db.execute(
                        Post_React.save(postId, username, icon_id),
                        (err, result) => {
                            res.redirect("back");
                        }
                    );
                });
                //add react
            }
        });
    }
    detailPost(req, res, next) {
        let postId = req.params.post_id;
        let username = req.cookies.username;
        db.execute(Posts.findByTag("post_id", postId), (err, result) => {
            // console.log(result);
            db.execute(Post_React.findReact(postId, username), (err, findReact) => {
                if (findReact.length == 0) {
                    res.render("user/detail_post", {
                        post: result[0],
                        icon_id: 0,
                    });
                } else {
                    res.render("user/detail_post", {
                        post: result[0],
                        icon_id: findReact[0].icon_id,
                    });
                }
            });
        });
    }
}
module.exports = new PostsController();