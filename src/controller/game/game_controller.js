const ser = require("../../service/game/game_service")
const mctrl = require("../controller") //thema설정하려고 추가

const views = {
    check: (req, res) => {
        console.log("req.session.uid : ", req.session.uid)
        let msg = ser.pageRead.check(req.session.uid)
        res.send(msg)
    },
    index: async (req, res) => {
        const thema = await mctrl.userThema(req.session) //사용자 테마 설정
        res.render("game/index", { username: req.session.uid, thema })
    },
    info: async (req, res) => {
        const thema = await mctrl.userThema(req.session) //사용자 테마 설정
        res.render("game/info", { username: req.session.uid, thema })
    },
    play: async (req, res) => {
        const thema = await mctrl.userThema(req.session) //사용자 테마 설정
        console.log("req.session.uid : ", req.session.uid)
        res.render("game/play", { username: req.session.uid, thema })
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