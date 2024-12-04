const dao = require("../../database/member/member_dao")
const serCom = require("../ser_common");

const process = {
    ser_insert : async(body) => {
        delete body.pwd2
        body.dotori = 0;
        const result = await dao.process.dao_insert( body )
        console.log(body)
        if( result != 0 ){
            msg = "회원 가입 성공";
            url = "/member/login_form";
        }else{
            msg = "회원 가입 실패";
            url = "/member/register_form";
        }
        return serCom.getMessage(msg, url);
    },
    ser_login : async( body , req , res) => {
        const result = await dao.process.dao_login( body.id )
        if(result.rows.length == 0 ){
            msg = "존재하지 않는 id"
            url = "/member/login_form"
        }else{
           if(result.rows[0].PWD == body.pwd ){
                req.session.uid = body.id;
                req.session.name =  result.rows[0].NAME
                res.cookie("isLogin", true)
                msg = "성공"
                url = "/"
           }else{
                msg = "비번틀림"
                url = "/member/login_form"
           }
        }
        return serCom.getMessage(msg, url);
    },
    ser_idCheck : async(uid) => {
        let result = await dao.process.dao_idCheck(uid);
        console.log("dao.result",result)
        if(result.rows.length > 0){
            result = { isAvailable: false };
        }else{
            result = { isAvailable: true };
        }
        console.log("result : ",result)
        return result;
    }

}
module.exports = {process }