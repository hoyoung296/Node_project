module.exports = (app) => {
    const memberRouter = require("../routers/member/member_router");
    app.use("/member", memberRouter)

    const gameRouter = require("../routers/game/game_router")
    app.use("/game", gameRouter)

    const router = require("express").Router();
    router.get("/", (req, res) => {
        res.render("main",{id : req.session.uid})
    })

    return router;
}