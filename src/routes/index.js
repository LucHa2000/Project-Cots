const newsfeedRouter = require("./newsfeed");
const siteRouter = require("./site");
const authRouter = require("./auth");
const profileRouter = require("./profile");
const inboxRouter = require("./inbox");
const crewRouter = require("./crew");
const adminRouter = require("./admin");
const friendsRouter = require("./friends");
const postsRouter = require("./post");
const commentRouter = require("./comment");
const authMiddlewares = require("../app/middlewares/AuthMiddlewares");

function router(app) {
    app.use(
        "/newsfeed",
        authMiddlewares.checkAccount,
        authMiddlewares.checkRoleUser,
        newsfeedRouter
    );
    app.use(
        "/admin",
        authMiddlewares.checkAccount,
        authMiddlewares.checkRoleAdmin,
        adminRouter
    );
    app.use(
        "/profile",
        authMiddlewares.checkAccount,
        authMiddlewares.checkRoleUser,
        profileRouter
    );
    app.use(
        "/inbox",
        authMiddlewares.checkAccount,
        authMiddlewares.checkRoleUser,
        inboxRouter
    );
    app.use("/auth", authRouter);
    app.use("/crew", crewRouter);
    app.use(
        "/friends",
        authMiddlewares.checkAccount,
        authMiddlewares.checkRoleUser,
        friendsRouter
    );
    app.use(
        "/post",
        authMiddlewares.checkAccount,
        authMiddlewares.checkRoleUser,
        postsRouter
    );
    app.use(
        "/comment",
        authMiddlewares.checkAccount,
        authMiddlewares.checkRoleUser,
        commentRouter
    );
    app.use(
        "/",
        authMiddlewares.checkAccount,
        authMiddlewares.checkRoleUser,
        siteRouter
    );
}
module.exports = router;