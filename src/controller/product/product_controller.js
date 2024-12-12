const ser = require("../../service/product/product_service")
// const fs = require("fs")
const mctrl = require("../controller")

const list = async (req, res) => {
    // const thema = await mctrl.userThema(req.session)
    const productList = await ser.productList()
    const thema = await ser.haveThema(req.session.uid)
    const userDotori = await ser.member(req.session.uid)
    res.render("product/list", {uid : req.session.uid , list : productList, uThema : thema.uThema, hThema : thema.hThema, uDotori : userDotori.DOTORI})
}

const load = (req, res) => {
    const path = `./thema/${req.query.thema}`
    res.download(path)
}

const purchase = async (req, res) => {
    const result = await ser.loginCheck(req.query.no, req.session.uid)
    res.send(result)
}

async function saveThema(req, res) {
    console.log("ctrl saveThema")
    ser.saveThema(req.session.uid, req.query.thema)
}

module.exports = {list, load, purchase, saveThema}