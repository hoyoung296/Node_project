const dao = require("../../database/product/product_dao")

const rename = (themaList) => {
    let thema = []
    let i = 0
    themaList.forEach(t => {
        thema[i] = t.split(".")[0]
        i++
    });
    return thema
}

const listSetting = (path, name) => {
    let list = []
    for(let i = 0; i < path.length; i++){
        list[i] = {"path" : path[i], "name" : name[i]}
    }
    return list
}

const productList = async () => {
    const list = await dao.productList()
    console.log("plist ser : ", list)
    return list.rows
}

const purchase = async (no, uid) => {
    const result = await dao.purchase(no, uid)
}

module.exports = {rename, listSetting, purchase, productList}

