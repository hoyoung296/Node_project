const ser = require("../../service/product/product_service")
// const fs = require("fs")
const mctrl = require("../controller")

const list = async (req, res) => {
    const thema = await mctrl.userThema(req.session)
    const productList = await ser.productList()
    console.log(req.session)
    res.render("product/list", {list : productList, thema})
}

const load = (req, res) => {
    const path = `./thema/${req.query.thema}`
    res.download(path)
}

const purchase = async (req, res) => {
    const result = await ser.loginCheck(req.query.no, req.session.uid)
    console.log(result)
    res.send(result)
}

module.exports = {list, load, purchase}