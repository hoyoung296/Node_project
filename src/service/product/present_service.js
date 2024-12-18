const dao = require("../../database/product/present_dao")
const fdao = require("../../database/friends/friends_dao")
const common = require("../ser_common")

const transmitCheck = async (body) => {
    const result = await dao.transmitCheck(body.transmit)
    console.log("trans", result)
    return result.rows
}

const receiveDotoriCheck = async (uid) => {
    // console.log("uid", uid)
    const result = await dao.receiveDotoriCheck(uid)
    // console.log("ser : ", result)
    return result.rows[0]
}

const sendDotori = async (body, uid) => {
    console.log("tid", body.dotori)
    const result = await dao.sendDotori(body.dotori, body.transmit)
    let msg = '', url = '/present'
    console.log(result)
    if(result == 0){
        msg = "도토리 전송에 실패하였습니다."
    }else{
        console.log("전송성공")
        const decreaseResult = await dao.decrease(body.dotori, uid)
        if(decreaseResult == 0){
            msg = "도토리 전송에 실패하였습니다."
        }else{
            msg = body.transmit + "님에게 도토리 " + body.dotori + "개를 선물하였습니다."
            alram(body, uid)
        }
    }
    return common.getMessage(msg, url)
}

const alram = async (body, uid) => {
    let alramBody = {}
    alramBody.sender = uid
    alramBody.receiver = body.transmit
    alramBody.object = '도토리 선물'
    alramBody.subject = '도토리 선물'
    alramBody.content = body.msg
    console.log("alramBody", alramBody)
    await fdao.daoInsert.insert(alramBody)
}

module.exports = {transmitCheck, receiveDotoriCheck, sendDotori}