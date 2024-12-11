const pser = require("../service/product/product_service")

const main = async (req, res) => {
    const thema = await userThema(req.session)
    const isLogin = req.cookies.isLogin === "true";
    console.log("thema", thema)
    res.render("main", { isLogin, thema })
}

const userThema = async (session) => {
    let thema = "brown"
    if(session.uid != undefined){
        thema = await pser.userThema(session.uid)
    }
    return thema
}

module.exports = {main, userThema}