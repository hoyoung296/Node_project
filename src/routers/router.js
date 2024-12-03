module.exports = (app) => {
    const bodyParser = require("body-parser")
    app.use(bodyParser.urlencoded())
    const gameRouter = require("../routers/game/game_router")
    app.use("/game", gameRouter)

    const router = require("express").Router();
    router.get("/", (req, res) => {
        res.render("main")
    })

    return router;
}