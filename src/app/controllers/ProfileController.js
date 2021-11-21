const express = require('express')
const router = express.Router()
const db = require('../../config/db')
const Account = require('../models/Account')
class ProfileController {
     index(req, res,next){
        res.render('user/profile')
     }
     editPage(req, res, next){
        res.render('user/edit_profile')
     }
}
module.exports = new ProfileController()