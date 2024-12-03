module.exports = (app) => {
    const memberRouter = require("../routers/member/member_router");
    app.use("/member",memberRouter)  


    const router = require("express").Router();
    router.get("/", (req, res) => {
        res.render("main")
    })

    return router;
}