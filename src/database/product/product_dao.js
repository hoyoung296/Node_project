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

const purchase = async (no, uid) => {
    const sql = `insert into buy values(${no}, '${uid}')`
    let result = 0
    try{
        result = (await con).execute(sql)
    }catch(err){
        console.log(err)
    }
    return result
}
module.exports = { productList, purchase }