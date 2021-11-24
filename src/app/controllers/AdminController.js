const express = require('express')
const router = express.Router()
const db = require('../../config/db')
const Account = require('../models/Account')
class AdminController {
     index(req, res, next){
        res.render('admin/account_view')
    }
   
}
module.exports = new AdminController()