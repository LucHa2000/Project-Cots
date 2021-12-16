const express = require("express");
const router = express.Router();
const db = require("../../config/db");
const Account = require("../models/Account");
const { pagination } = require("../../util/pagination");

const quantityItem = 5;
class AdminController {
  index(req, res, next) {
    var numberPage = req.query.Page || 1;
    db.execute(Account.findAll(), (err, result) => {
      if (err) throw err;
      res.render("admin/account_view", {
        accounts: pagination(result, numberPage, quantityItem),
      });
    });
  }
}
module.exports = new AdminController();
