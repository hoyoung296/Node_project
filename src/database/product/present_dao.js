const con = require("../db_common")

const transmitCheck = async (tid) => {
    const sql = `select * from member where id='${tid}'`
    let result = 0
    try{
        result = (await con).execute(sql)
    }catch(err){
        console.log(err)
    }
    return result
}

const sendDotori = async (dotori, tid) => {
    console.log("dao", tid)
    const sql = `update member set dotori=dotori+${dotori} where id='${tid}'`
    let result = 0
    try{
        result = (await con).execute(sql)
        console.log("전송성공")
    }catch(err){ 
        console.log(err)
    }
    return result
}

const receiveDotoriCheck = async (uid) => {
    const sql = `select * from member where id='${uid}'`
    let result = 0
    try{
        result = (await con).execute(sql)
    }catch(err){
        console.log(err)
    }
    return result
}

const decrease = async (dotori, uid) => {
    const sql = `update member set dotori=dotori-${dotori} where id='${uid}'`
    let result = 0
    try{
        result = (await con).execute(sql)
    }catch(err){ 
        console.log(err)
    }
    return result
}

module.exports = {transmitCheck, sendDotori, receiveDotoriCheck, decrease}