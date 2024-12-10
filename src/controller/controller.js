const pser = require("../service/product/product_service")

const main = async (req, res) => {
    let thema = "brown"
    if(req.session.uid != undefined){
        thema = await pser.userThema(req.session.uid)
    }
    const isLogin = req.cookies.isLogin === "true";
    console.log("thema", thema)
    res.render("main", { isLogin, thema })
}

module.exports = {main}