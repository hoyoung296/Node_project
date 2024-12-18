const pser = require("../service/product/product_service")
const mypser = require("../service/mypage/mypage_service");

const main = async (req, res) => {
    const thema = await userThema(req.session)
    const isLogin = req.cookies.isLogin === "true";
    if(req.session.uid){
        const userInfo = await mypser.getUserInfo(req.session.uid);
        req.session.dotori = userInfo.DOTORI
    }

    console.log("thema", thema)
    res.render("main", { isLogin, thema })
}

const userThema = async (session) => {
    let thema = "brown"
    if(session.uid != undefined){
        const uThema = await pser.userThema(session.uid)
        thema = uThema.PRODUCT
    }
    return thema
}

module.exports = {main, userThema}