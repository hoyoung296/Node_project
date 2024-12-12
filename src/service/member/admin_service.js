const dao = require("../../database/member/admin_dao")
const serCom = require("../ser_common");
const process = {
    ser_memberlist : async() => {
        const data = await dao.process.dao_memberlist()
        // console.log("data.rows : ",data.rows);
        return data.rows;
    },
    ser_memberdel : async(id) => {
        const rs = await dao.process.dao_memberdel(id)
        if (rs != 0){
            msg = "삭제 성공"
            url = "/admin/memberlist"
        }else{
            msg = "삭제 실패"
            url = "/admin/memberlist"
        }
        return serCom.getMessage(msg,url);
    },
    ser_boardlist : async() => {
        const data = await dao.process.dao_boardlist()
        console.log("data.rows : ",data.rows);
        const list = serCom.timeModify(data.rows);
        console.log("data.rows : ",data.rows);
        return list;
    },
}

module.exports = { process }