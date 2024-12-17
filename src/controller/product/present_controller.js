const commonSer = require("../../service/ser_common")
const mctrl = require("../controller") //thema설정하려고 추가

const presentForm = async (req, res) => {
    const thema = await mctrl.userThema(req.session) //사용자 테마 설정
    res.render("product/present", {thema})
}

module.exports = {presentForm}