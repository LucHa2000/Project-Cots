const express = require("express");
const router = express.Router();
const db = require("../../config/db");
const Account = require("../models/Account");
const Posts = require("../models/Posts");
const Post_React = require("../models/Post_React");
const Post_Comment = require("../models/Post_Comment");
const Post_comment_replies = require("../models/Post_comment_replies");
class PostsController {
    index(req, res, next) {}
        //delete post
        // route : /post/delete/:post_id
    deletePost(req, res, next) {
            console.log(req.params.post_id);
            let postId = req.params.post_id;
            db.execute(Post_React.deleteWithPostId(postId), (err, result) => {
                db.execute(Posts.delete(postId), (err, result) => {
                    res.redirect("back");
                });
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
        //detail post when comments
    detailPost(req, res, next) {
            let postId = req.params.post_id;
            let username = req.cookies.username;
            //find post
            db.execute(Posts.findByTag("post_id", postId), (err, result) => {
                //find react
                db.execute(Post_React.findReact(postId, username), (err, findReact) => {
                    //find comment
                    db.execute(
                        Post_Comment.findByTag("post_id", postId),
                        (err, comments) => {
                            db.execute(
                                Post_comment_replies.findAll(),
                                (err, comment_replis) => {
                                    comments.forEach((comment) => {
                                        comment.reply = [];
                                        comment_replis.forEach((comment_reply) => {
                                            if (comment.comment_id == comment_reply.comment_id) {
                                                comment.reply.push(comment_reply);
                                            }
                                        });
                                    });
                                    db.execute(
                                        Post_React.findReactWithPostId(postId),
                                        (err, reacts) => {
                                            if (findReact.length == 0) {
                                                res.render("user/detail_post", {
                                                    post: result[0],
                                                    icon_id: 0,
                                                    comments: comments,
                                                    reacts: reacts,
                                                });
                                            } else {
                                                res.render("user/detail_post", {
                                                    post: result[0],
                                                    icon_id: findReact[0].icon_id,
                                                    comments: comments,
                                                    reacts: reacts,
                                                });
                                            }
                                        }
                                    );
                                }
                            );
                        }
                    );
                });
            });
        }
        // post comment
    postComment(req, res, next) {
            let postId = req.params.post_id;
            let comment_content = req.body.comment_content;
            let username = req.cookies.username;
            let comment_status = 1;
            console.log(req.body.comment_content);
            db.execute(
                Post_Comment.save(postId, username, comment_content, comment_status),
                (err, result) => {
                    res.redirect("back");
                }
            );
        }
        //switch status post
    switchPost(req, res, next) {
            let postId = req.params.post_id;
            db.execute(Posts.findByTag("post_id", postId), (err, result) => {
                let switchValue = 1;
                if (result[0].post_status == 1) {
                    switchValue = 0;
                }
                db.execute(
                    Posts.updateStatus(postId, switchValue),
                    (err, statusUpload) => {
                        res.redirect("back");
                    }
                );
            });
        }
        //reply comment
    replyComment(req, res, next) {
        let username = req.cookies.username;
        let comment_id = req.params.comment_id;
        let reply_content = req.body.reply_content;
        console.log(username + "-" + comment_id + "- " + reply_content);
        db.execute(
            Post_comment_replies.save(comment_id, username, reply_content),
            (err, result) => {
                res.redirect("back");
            }
        );
    }
    deleteComment(req, res, next) {
        let commentId = req.params.comment_id;
        //delete reply comment
        console.log("conmment oid" + commentId);
        db.execute(Post_comment_replies.delete(commentId), (err, result) => {
            //delete  comment
            db.execute(Post_Comment.delete(commentId), (err, result) => {
                res.redirect("back");
            });
        });
    }
}
module.exports = new PostsController();