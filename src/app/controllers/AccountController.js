const express = require('express')
const router = express.Router()
const db = require('../../config/db')
const Account = require('../models/Account')



class AccountController {
     index(req, res, next){
        db.execute(Account.findAll(),function(err,result){
            if(err) throw err 
            res.render('user/home',{user : result})
        })
    }
    userList(req,res, next){
    //    let {username,email,password} = req.body
    //    let Id= '233'

    //    let user = new User(Id,email,username,password)
    //    user.save()
    //    res.redirect('/')

    }
    postUser(req,res, next){
        // var insertUser = `INSERT INTO USES VALUES (6,"${req.body.username}" ,"${req.body.email}","${req.body.password}")`
        // console.log(req)
        // db.execute(insertUser,function(err,result){
        //     if(err) throw err
           
        //     res.redirect('/')
            
        // })
        let {username,email,password} = req.body
        let Id= '2212'
        let user = new Account(Id,email,username,password)
        user.save()
        res.redirect('/')

    }
    deleteUser(req,res,next){
        const id = req.params.id
        var deleteUser =  `DELETE FROM USES WHERE userId = ?`
        db.execute(deleteUser,[id],function(err,result){
            if(err) throw err 
            res.redirect('/')
        })
    
    }

    // editUser(req,res,next){
    //     var selectUser =  `Select * FROM USES WHERE userId = ${req.params.id}`
    //     db.execute(deleteUser,function(err,result){
    //         if(err) throw err 
            
    //     })
    // }
}
module.exports = new AccountController()