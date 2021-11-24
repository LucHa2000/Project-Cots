var express = require('express')
var router =  express.Router()
const newsfeedController = require('../app/controllers/NewsFeedController')
// router.post('/search',accountController.search)
router.get('/',newsfeedController.index)
module.exports = router