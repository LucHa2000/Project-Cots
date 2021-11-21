var express = require('express')
var router =  express.Router()
const accountController = require('../app/controllers/AccountController')

router.post('/post',accountController.postUser)
router.get('/:id/delete',accountController.deleteUser)
// router.get('/:id',userController.editUser)
router.get('/',accountController.index)

// const userController = require('user-controller')
module.exports = router