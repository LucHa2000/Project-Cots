var express = require('express')
var router =  express.Router()
const inboxController = require('../app/controllers/InboxController')
router.get('/',inboxController.index)
router.get('/test',inboxController.test)
module.exports = router