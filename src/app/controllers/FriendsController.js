const express = require("express");
const router = express.Router();
const db = require("../../config/db");
const Crew = require("../models/Crews");
const Followers = require("../models/Followers");
const Accounts = require("../models/Account");
const Crew_members = require("../models/Crew_members");

class FriendsController {
    //page friends
    index(req, res, next) {
        let username = req.cookies.username;
        //list following
        db.execute(Followers.findByTag("username", username), (err, following) => {
            //list follower
            db.execute(
                Followers.findByTag("follower_username", username),
                (err, followerss) => {
                    //list myGroup
                    db.execute(Crew.findByTag("admin", username), (err, myGroup) => {
                        //list Group joined
                        db.execute(
                            Crew_members.findByTag("member_username", username),
                            (err, memberGroup) => {
                                res.render("user/friends", {
                                    followers: followerss,
                                    following: following,
                                    myGroup: myGroup,
                                    memberGroup: memberGroup,
                                });
                            }
                        );
                    });
                }
            );
        });
    }
    inforFriends(req, res, next) {
        let usernameFriend = req.params.username;
        db.execute(
            Accounts.findByTag("username", usernameFriend),
            (err, account) => {
                res.render("user/infor_friend", { account: account[0] });
            }
        );
    }
}
module.exports = new FriendsController();