const db = require("../../config/db");
const Account = require("../models/Account");
let Random = Math.floor(Math.random() * 1000000 + 100).toString();
var nodemailer = require("nodemailer"); //sendEmailConfirm
class AuthController {
    //render page Login
    index(req, res, next) {
            res.render("auth/login", {
                error_message: req.cookies.error_message,
                message: req.cookies.message,
            });
            res.clearCookie("error_message");
            res.clearCookie("message");
        }
        //[post] auth/user_login
    login(req, res, next) {
            let username = req.body.username.trim();
            let password = req.body.password.trim();
            db.execute(Account.findByTag("username", username), (err, result) => {
                if (req.body["g-recaptcha-response"]) {
                    if (result.length === 0 || result[0].acc_status != 1) {
                        res.cookie("error_message", "The account does not exist yet");
                        res.redirect("back");
                    } else {
                        if (result[0].acc_password == password) {
                            res.cookie("username", result[0].username);
                            res.cookie("author", true);
                            if (result[0].acc_type_id == 2) {
                                res.redirect("/newsfeed");
                            } else {
                                res.redirect("/admin");
                            }
                        } else {
                            res.cookie("error_message", "Wrong password !");
                            res.redirect("back");
                        }
                    }
                } else {
                    res.cookie("error_message", " Please check capcha !");
                    res.redirect("back");
                }
            });
        }
        //render page signup
    pageSignup(req, res, next) {
            if (req.cookies.code) {
                res.render("auth/signup", {
                    // error_email : req.cookies.error_email
                });
            } else {
                res.redirect("/auth/singup_email");
            }
        }
        //auth [put] / register
    register(req, res, next) {
        if (req.cookies.confirmMail == "true") {
            if (req.body.acc_password != "" && req.body.username) {
                let avatar = "avatar-nomal.png";
                let username = req.body.username;
                let acc_password = req.body.password;
                let email = req.session.email;
                let first_name = "";
                let last_name = "";
                let birthday = "2000-02-02";
                let job = "";
                let bio = "";
                let gender = 1;
                let acc_type_id = 2;
                let acc_status = 1;
                db.execute(
                    Account.findByTag("username", username),
                    function(err, result) {
                        if (result.length != 0) {
                            res.redirect("/error");
                        } else {
                            let newAccount = new Account(
                                username,
                                acc_password,
                                email,
                                first_name,
                                last_name,
                                birthday,
                                gender,
                                bio,
                                job,
                                acc_status,
                                acc_type_id,
                                avatar
                            );
                            newAccount.save();
                            res.cookie("message", "Resister successful");
                            res.redirect("/auth");
                        }
                    }
                );
            }
        } else {
            res.redirect("back");
        }
    }
    pageCode(req, res, next) {
        res.clearCookie("error");
        res.render("auth/confirmEmail_view", {
            error: req.cookies.error,
            message: "Check your email",
        });
    }
    confirmCode(req, res, next) {
        if (req.body.code.trim() == req.session.code) {
            res.cookie("confirmMail", "true");
            res.render("auth/signup");
        } else {
            // res.clearCookie('message');
            res.cookie("error", "Verification codes is not correct");
            res.redirect("back");
        }
    }
    sendMail(req, res, next) {
        let email = req.body.confirmEmail;
        db.execute(Account.findByTag("email", email), (err, result) => {
            if (result.length === 0) {
                var transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: "danchoiphonui27@gmail.com", // generated ethereal user
                        pass: "danchoiphonui27", // generated ethereal password
                    },
                });
                var mailMessage = {
                    from: "danchoiphonui27@gmail.com",
                    to: email,
                    subject: "Confirm Email",
                    text: Random,
                };
                transporter.sendMail(mailMessage, function(error, data) {});
                //res.cookie('code', Random);
                req.session.code = Random;
                console.log("===== code day ne :D " + Random);
                req.session.email = email;
                res.cookie("message", "Check your email");
                res.redirect("/auth/pageCode");
            } else {
                res.cookie("error_email", "The account already exists");
                res.redirect("back");
            }
        });
    }
    pageForgotPassword(req, res, next) {
        res.render("auth/forgotPassword", {
            error_sendAccount: req.cookies.error_sendAccount,
        });
        res.clearCookie("error_sendAccount");
    }
    pageSignup_email(req, res, next) {
        res.render("auth/signup_email", {
            error_email: req.cookies.error_email,
        });
        res.clearCookie("error_email");
    }
    sendAccount(req, res, next) {
        let email = req.body.forgotEmail.trim();
        db.execute(Account.findByTag("email", email), (err, result) => {
            if (result.length === 0) {
                res.cookie("error_sendAccount", "The account does not exist yet");
                res.redirect("back");
            } else {
                let username = result[0].username;
                let password = result[0].acc_password;
                var transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: "danchoiphonui27@gmail.com", // generated ethereal user
                        pass: "danchoiphonui27", // generated ethereal password
                    },
                });
                var mailMessage = {
                    from: "danchoiphonui27@gmail.com",
                    to: email,
                    subject: "Forgot Email",
                    text: `Your UserName : ${username} \n Your Password : ${password}`,
                };
                transporter.sendMail(mailMessage, function(error, data) {});
                res.cookie("message", "Please check your email !");
                res.redirect("/auth/login");
            }
        });
    }
    logout(req, res, next) {
        res.clearCookie("username");
        res.clearCookie("author");
        res.redirect("/");
    }
}
module.exports = new AuthController();