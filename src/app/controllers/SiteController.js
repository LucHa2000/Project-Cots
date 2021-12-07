const express = require("express");
const router = express.Router();
const db = require("../../config/db");
const Account = require("../models/Account");
const Followers = require("../models/Followers");
const Crews = require("../models/Crews");
const Crew_members = require("../models/Crew_members");
class SiteController {
    index(req, res, next) {
            res.render("user/home");
        }
        //page error
    error(req, res, next) {
            res.render("tool/error");
        }
        //render page search group
    pageSearchGroup(req, res, next) {
            let name = req.params.name;
            let username = req.cookies.username;
            db.execute(Crews.findByNameLike(name), (err, crews) => {
                db.execute(
                    Crew_members.findByNameLike("crew_name", name),
                    (err, members) => {
                        crews.forEach((crew) => {
                            members.forEach((member) => {
                                if (
                                    member.crew_name === crew.crew_name &&
                                    member.member_username === username
                                ) {
                                    crew.join = 1;
                                }
                            });
                        });
                        res.render("user/search", {
                            crews: crews,
                            search: name,
                        });
                    }
                );
            });
        }
        //render page search
    pageSearch(req, res, next) {
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
                }
            );
            res.render("user/search", {
                accounts: accounts,
                search: name,
            });
        });
    }
    find(req, res, next) {
            let value = req.body.search;
            res.redirect(`/pageSearch/${value}`);
        }
        //follow people
    follow(req, res, next) {
            let username = req.cookies.username;
            let username_follower = req.params.follower;
            db.execute(
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
        //unfollow people
    unfollow(req, res, next) {
            let username = req.cookies.username;
            let username_follower = req.params.follower;
            db.execute(Followers.delete(username, username_follower), (err, result) => {
                res.redirect(`back`);
            });
        }
        //join group
    join(req, res, next) {
            let member = req.cookies.username;
            let crew_name = req.params.crew_name;
            db.execute(Crews.findByTag("crew_name", crew_name), (err, result) => {
                db.execute(
                    Crew_members.save(crew_name, member, result[0].avatar),
                    (err, result) => {
                        res.redirect("back");
                    }
                );
            });
        }
        //leave group
    leave(req, res, next) {
        let member = req.cookies.username;
        let crew_name = req.params.crew_name;
        db.execute(Crew_members.delete(crew_name, member), (err, result) => {
            res.redirect("back");
        });
    }
}
module.exports = new SiteController();