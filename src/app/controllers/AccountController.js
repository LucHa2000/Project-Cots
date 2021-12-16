const multer = require("multer");
const upload = multer({ dest: "src/public/uploads/" });
const Account = require("../models/Account");
const db = require("../../config/db");
const { pagination } = require("../../util/pagination");

const quantityItem = 5;

class AccountController {
  createAccount(req, res, next) {
    db.execute(
      Account.findByTag("username", req.body.username),
      (err, result) => {
        if (result.length >= 1) res.redirect("back");
        else {
          db.execute(
            new Account(
              req.body.username,
              req.body.password,
              req.body.email,
              req.body.firstName,
              req.body.lastName,
              req.body.birthday,
              req.body.gender,
              req.body.bio,
              req.body.job,
              1,
              2,
              ""
            ).save(),
            (err, result) => {
              if (err) throw err;
              res.render("admin/account_view"),
                {
                  accounts: pagination(result, numberPage, quanittyItem),
                };
            }
          );
        }
      }
    );
  }
  deleteAccount(req, res, next) {
    Account.deleteAccount();
  }
}
