const accountRouter = require('./account')
const authRouter = require('./auth')
const profileRouter = require('./profile')
function router(app){
    app.use('/profile',profileRouter)
    app.use('/auth',authRouter)
    app.use('/',accountRouter)
}
module.exports = router