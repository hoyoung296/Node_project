const con = require("../db_common")

const productList = async () => {
    const sql = `select * from product`
    let result = ''
    try{
        result = (await con).execute(sql)
    }catch(err){
        console.log(err)
    }
    return result
}

const product = async (no) => {
    const sql = `select * from product where PRODUCT_NO='${no}'`
    let result = ''
    try{
        result = (await con).execute(sql)
    }catch(err){
        console.log(err)
    }
    return result
}

const purchase = async (no, uid, dotori) => {
    const sql = `insert into buy values(${no}, '${uid}')`
    let result = 0
    try{
        result = (await con).execute(sql)
        await dotoriUse(uid, dotori)
    }catch(err){
        console.log(err)
    }
    return result
}

const dotoriUse = async (uid, dotori) => {
    const sql = `update member set dotori=${dotori} where id='${uid}'`
    let result = 0
    try{
        result = (await con).execute(sql)
    }catch(err){ 
        console.log(err)
    }
    return result
}

const doCheck = async (uid) => {
    const sql = `select * from member where ID='${uid}'`
    let result = 0
    try{
        result = (await con).execute(sql)
    }catch(err){
        console.log(err)
    }
    console.log("daodoto : ", result)
    return result
}

const userThema = async (uid) => {
    const sql = `select * from member, product where id='${uid}' AND member.thema_no = product.product_no`
    let result = 0
    try{
        result = (await con).execute(sql)
    }catch(err){
        console.log(err)
    }
    return result
}

const haveThema = async (uid) => {
    const sql = `select b.product_no, p.product from product p, buy b where id='${uid}' and p.product_no = b.product_no`
    let result = 0
    try{
        result = (await con).execute(sql)
    }catch(err){
        console.log(err)
    }
    return result
}

const saveThema = async (uid, thema_no) => {
    console.log("saveThema")
    const sql = `update member set thema_no='${thema_no}' where id='${uid}'`
    let result = 0
    try{
        result = (await con).execute(sql)
    }catch(err){
        console.log(err)
    }
}

module.exports = { productList, purchase, doCheck, product, userThema, haveThema, saveThema }