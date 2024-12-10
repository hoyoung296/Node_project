const ser = require("../../service/product/product_service")
const fs = require("fs")

const list = async (req, res) => {
    const productList = await ser.productList()
    const themaPath = fs.readdirSync("./public/thema")
    const themaName = ser.rename(themaPath)
    
    console.log(req.session)
    res.render("product/list", {list : productList})
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