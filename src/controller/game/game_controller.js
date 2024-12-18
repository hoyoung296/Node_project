const ser = require("../../service/game/game_service")
const mctrl = require("../controller") //thema설정하려고 추가
const mypser = require("../../service/mypage/mypage_service");

const views = {
    check: (req, res) => {
        let msg = ser.pageRead.check(req.session.uid,req.session.name)
        res.send(msg)
    },
    index: async (req, res) => {
        const thema = await mctrl.userThema(req.session) //사용자 테마 설정
        res.render("game/index", { name: req.session.uid, thema })
    },
    info: async (req, res) => {
        const thema = await mctrl.userThema(req.session) //사용자 테마 설정
        res.render("game/info", { name: req.session.uid, thema })
    },
    play: async (req, res) => {
        const thema = await mctrl.userThema(req.session) //사용자 테마 설정
        res.render("game/play", { name: req.session.uid, thema, name1 : req.session.name })
    }
}
const process = {
    update: async (req, res) => {
        req.body.result = parseInt(req.body.result)
        await ser.pageUpdate.update(req.body)
        const userInfo = await mypser.getUserInfo(req.session.uid); //사용자 사진, 메세지 설정
        req.session.dotori = userInfo.DOTORI
        res.redirect("/game/index")
    }
}

module.exports = { views, process }