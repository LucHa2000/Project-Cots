var express = require('express');
var router = express.Router();
const authMiddlewares = require('../app/middlewares/AuthMiddlewares');
const profileController = require('../app/controllers/ProfileController');
router.get('/editPage',profileController.editPage)
router.use('/', profileController.index);
    

module.exports = router;
