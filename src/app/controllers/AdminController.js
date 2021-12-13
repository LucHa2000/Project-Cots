const express = require("express");
const router = express.Router();
const db = require("../../config/db");
const Account = require("../models/Account");
class AdminController {
  index(req, res, next) {
    db.execute(Account.findAll(), (err, result) => {
      if (err) throw err;
      res.render("admin/account_view", {
        accounts: result,
      });
    });
  }
}
module.exports = new AdminController();
