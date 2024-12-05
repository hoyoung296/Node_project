const ser = require("../../service/game/game_service")
const views = {
    check: (req, res) => {
        console.log("req.session.uid : ", req.session.uid)
        let msg = ser.pageRead.check(req.session.uid)
        res.send(msg)
    },
    index: (req, res) => {
        res.render("game/index")
    },
    info: (req, res) => {
        res.render("game/info")
    },
    play: (req, res) => {
        console.log("req.session.uid : ", req.session.uid)
        res.render("game/play", { username: req.session.uid })
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