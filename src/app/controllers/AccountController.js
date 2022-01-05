const multer = require("multer");
const upload = multer({ dest: "src/public/uploads/" });
const Account = require("../models/Account");
const db = require("../../config/db");
const { pagination } = require("../../util/pagination");
var moment = require("moment");

const quantityItem = 5;

class AccountController {
    createAccount(req, res, next) {
        let username = req.body.username;
        let password = req.body.password;
        let email = req.body.email;
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let birthday = req.body.birthday;
        let gender = req.body.gender;
        let bio = req.body.bio;
        let job = req.body.job;
        let accStatus = 1;
        let accType = 2;
        let avatar = "default-avatar.jpg";
        db.execute(
            Account.findByTag("username", req.body.username),
            (err, result) => {
                if (result.length != 0) res.redirect("/error");
                else {
                    let account = new Account(
                        username,
                        password,
                        email,
                        firstName,
                        lastName,
                        birthday,
                        gender,
                        bio,
                        job,
                        accStatus,
                        accType,
                        avatar
                    );
                    account.save();
                    res.redirect("/admin");
                }
            }
        );
    }

    deleteAccount(req, res, next) {
        let username = req.params.username;
        console.log("xoa" + username);
        db.execute(Account.deleteAccount(username), (err, result) => {
            res.redirect("back");
        });
    }

    changeAccountStatus(req, res, next) {
        req.params.status == 1 ?
            (req.body.acc_status = 0) :
            (req.body.acc_status = 1);
        db.execute(
            Account.updateAccountStatus(req.params.username, req.body.acc_status),
            (err, result) => {
                res.redirect("back");
            }
        );
    }

    updateAccountPage(req, res, next) {
        db.execute(
            Account.findByTag("username", req.params.username),
            (err, result) => {
                if (err) throw err;
                res.render("admin/update_account", {
                    account: result[0],
                });
            }
        );
    }

    updateAccount(req, res, next) {
        let username = req.body.username;
        let password = req.body.password;
        let email = req.body.email;
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let birthday = req.body.birthday;
        let gender = req.body.gender;
        let bio = req.body.bio;
        let job = req.body.job;
        let accStatus = 1;
        let accType = 2;
        if (!req.file) {
            var avatar = req.body.img_old;
        } else {
            var avatar = req.file.path.split("\\").slice(3).join();
        }
        db.execute(
            Account.updateAccount(
                username,
                password,
                email,
                firstName,
                lastName,
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

module.exports = new AccountController();