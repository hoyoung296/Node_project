const dao = require("../../database/product/product_dao")
const common = require("../ser_common")

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
    return list.rows
}

const product = async (no) => {
    const product =  await dao.product(no)
    return product.rows[0]
}

const purchase = async (no, uid) => {
    const udotori = await doCheck(uid)
    const prod = await product(no)
    const price = prod.PRICE
    console.log("check : " + udotori, price)
    let msg =''
    if(udotori < price){
        msg = "도토리가 부족합니다"
    }else {
        const dotori = udotori - price
        await dao.purchase(no, uid, dotori)
        console.log("구매완료")
        msg = "구매가 완료되었습니다"
    }   
    console.log(msg)
    return msg
}

const loginCheck = async (no, uid) => {
    let msg ='', url = '/product'
    if(!uid){
        msg = "로그인 이후 구매가능합니다"
    }else {
        msg = await purchase(no, uid)
    }
    return common.getMessage(msg, url)
}

const doCheck = async (uid) => {
    const dotori = await dao.doCheck(uid)
    return dotori.rows[0].DOTORI
}

const userThema = async (uid) => {
    const thema = await dao.userThema(uid)
    return thema.rows[0]
}

const haveThema = async (uid) => {
    const hThema = await dao.haveThema(uid)
    const uThema = await dao.userThema(uid)
    hThema.rows.unshift({PRODUCT_NO : 1, PRODUCT : 'brown'})
    let thema = 'brown'
    if(uThema.rows.length != 0){
        thema = uThema.rows[0].PRODUCT
    }
    return {hThema : hThema.rows, uThema : thema}
}

const saveThema = async (uid, no) => {
    await dao.saveThema(uid, no)
}

module.exports = {rename, listSetting, purchase, productList, loginCheck, userThema, haveThema, saveThema}