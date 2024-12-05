const ser = require("../../service/product/product_service")
const fs = require("fs")

const list = async (req, res) => {
    const productList = await ser.productList()
    console.log("ctrl : ", productList)
    const themaPath = fs.readdirSync("./public/thema")
    const themaName = ser.rename(themaPath)
    const themaList = ser.listSetting(themaPath, themaName)
    res.render("product/list", {list : productList})
}

const load = (req, res) => {
    const path = `./thema/${req.query.thema}`
    res.download(path)
}

const purchase = (req, res) => {
    const uid = req.session.uid
    const result = ser.purchase(req.query.no, uid)
}

module.exports = {list, load, purchase}