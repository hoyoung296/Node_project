const ser = require("../../service/game/game_service")
const views = {
    check: (req, res) => {
        let msg = ser.pageRead.check(req.session.username)
        res.send(msg)
    },
    index: (req, res) => {
        res.render("game/index")
    },
    info: (req, res) => {
        res.render("game/info")
    },
    play: (req, res) => {
        res.render("game/play", { username: req.session.id })
    }
}
const process = {
    update: async (req, res) => {
        req.body.result = parseInt(req.body.result)
        await ser.pageUpdate.update(req.body)
        res.redirect("/game/index")
    }
}

module.exports = { views, process }