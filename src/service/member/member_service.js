const dao = require("../../database/member/member_dao")
const serCom = require("../ser_common");

const process = {
    ser_insert : async(body) => {
        const result = await dao.process.dao_insert( body )
        if( result != 0 ){
            msg = "등록성공";
            url = "/member/login_form";
        }else{
            msg = "문제 발생";
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
                req.session.id = body.id;
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

}
module.exports = {process }