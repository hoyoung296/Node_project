const ser = require("../../service/product/product_service")
const fs = require("fs")

const list = (req, res) => {
    const themaPath = fs.readdirSync("./thema")
    const themaName = ser.rename(themaPath)
    const themaList = ser.listSetting(themaPath, themaName)
    res.render("product/list", {themaList})
}

const load = (req, res) => {
    const path = `./thema/${req.query.thema}`
    res.download(path)
}


module.exports = {list, load}