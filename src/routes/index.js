
const siteRouter = require("./site");
const authMiddlewares = require("../app/middlewares/AuthMiddlewares");

function router(app) {
    app.use(
        "/",
        siteRouter
    );
}
module.exports = router;