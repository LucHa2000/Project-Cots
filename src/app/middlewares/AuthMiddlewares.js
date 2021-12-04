var nodemailer = require("nodemailer"); //sendEmailConfirm
const Account = require("../models/Account");
const db = require("../../config/db");
class AuthMiddlewares {
    checkAccount(req, res, next) {
        if (!req.cookies.username) {
            res.redirect("/auth");
            return;
        } else {
            db.execute(
                Account.findByTag("username", req.cookies.username),
                function(err, result) {
                    if (err) throw err;
                    if (result.length == 0) {
                        res.redirect("/auth");
                        return;
                    } else {
                        next();
                    }
                }
            );
        }
    }
    checkRoleAdmin(req, res, next) {
        db.execute(
            Account.findByTag("username", req.cookies.username),
            function(err, result) {
                if (err) throw err;
                if (result[0].acc_type_id == 1) {
                    res.locals.username = result[0].username;
                    res.locals.avatar = result[0].avatar;
                    next();
                } else {
                    res.redirect("back");
                    return;
                }
            }
        );
    }
    checkRoleUser(req, res, next) {
        db.execute(
            Account.findByTag("username", req.cookies.username),
            function(err, result) {
                if (err) throw err;
                if (result[0].acc_type_id == 2) {
                    res.locals.username = result[0].username;
                    res.locals.avatar = result[0].avatar;
                    next();
                } else {
                    return;
                    res.redirect("back");
                }
            }
        );
    }
}
module.exports = new AuthMiddlewares();