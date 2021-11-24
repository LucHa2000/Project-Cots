const express = require('express')
const router = express.Router()
const db = require('../../config/db')
const Account = require('../models/Account')
const Follow = require('../models/Followers')
class InboxController {
     index(req, res, next){
         let username = req.cookies.username
        db.execute(Follow.findByTag("username",username),(err, result) => {
            res.render('user/inbox',{follower : result})
            // console.log(Account)
        })
  
    }
}
module.exports = new InboxController()