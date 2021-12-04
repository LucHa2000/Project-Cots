const express = require("express");
const router = express.Router();
const db = require("../../config/db");
const Account = require("../models/Account");
const Followers = require("../models/Followers");
class SiteController {
    index(req, res, next) {
        res.render("user/home");
    }
    error(req, res, next) {
        res.render("tool/error");
    }
    pageSearch(req, res, next) {
        console.log(req.locals);
        let name = req.params.name;
        db.execute(Account.findByNameLike(name), (err, accounts) => {
            db.execute(
                Followers.findByTag("username", req.cookies.username),
                (err, followers) => {
                    accounts.forEach((account) => {
                        followers.forEach((follower) => {
                            if (account.username === follower.follower_username) {
                                account.follow = 1;
                            }
                        });
                    });
                    res.render("user/search", { accounts: accounts });
                }
            );
        });
    }
    find(req, res, next) {
        let value = req.body.search;
        res.redirect(`/pageSearch/${value}`);
    }
    follow(req, res, next) {
        let username = req.cookies.username;
        let username_follower = req.params.follower;
        let avatar = db.execute(
            Account.findByTag("username", username_follower),
            (err, result) => {
                db.execute(
                    Followers.save(username, username_follower, result[0].avatar),
                    (err, result) => {
                        res.redirect("back");
                    }
                );
            }
        );
    }
    unfollow(req, res, next) {
        let username = req.cookies.username;
        let username_follower = req.params.follower;
        db.execute(Followers.delete(username, username_follower), (err, result) => {
            res.redirect(`back`);
        });
    }
}
module.exports = new SiteController();