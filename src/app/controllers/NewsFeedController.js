const express = require('express')
const router = express.Router()
const db = require('../../config/db')
const Account = require('../models/Account')
class NewsFeedController {
     index(req, res, next){
        db.execute(Account.findAll(),function(err,result){
            if(err) throw err 
            res.render('user/newsfeed',{user : result})
        })
    }
    search(req,res,next){
        
    }
}
module.exports = new NewsFeedController()