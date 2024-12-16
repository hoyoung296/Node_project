const dao = require("../../database/member/admin_dao")
const serCom = require("../ser_common");
const process = {
    ser_memberlist2 : async() => {
        const data = await dao.process.dao_memberlist2()
        // console.log("data.rows : ",data.rows);
        return data.rows;
    },
    ser_memberlist: async (start) => {
        if (start == undefined)
            start = 1;
        start = Number(start);
        const totalCnt = await dao.process.totalCnt();
        const num = totalCnt.rows[0]['COUNT(*)'];
        const result = (num % 15 == 0) ? 0 : 1;
        const page = parseInt(num / 15 + result);

        const startNum = (start - 1) * 15;

        const data = await dao.process.dao_memberlist(startNum)
        // console.log("data.rows : ",data.rows);
        return {data : data.rows, start,page};
    },
    ser_memberdel: async (id) => {
        const rs = await dao.process.dao_memberdel(id)
        if (rs != 0) {
            msg = "삭제 성공"
            url = "/admin/memberlist"
        } else {
            msg = "삭제 실패"
            url = "/admin/memberlist"
        }
        return serCom.getMessage(msg, url);
    },
    ser_boardlist: async () => {
        const data = await dao.process.dao_boardlist()
        console.log("data.rows : ", data.rows);
        const list = serCom.timeModify(data.rows);
        console.log("data.rows : ", data.rows);
        return list;
    },
    ser_boarddel: async (no) => {
        const rs = await dao.process.dao_boarddel(no)
        if (rs != 0) {
            msg = "삭제 성공"
            url = "/admin/boardlist"
        } else {
            msg = "삭제 실패"
            url = "/admin/boardlist"
        }
        return serCom.getMessage(msg, url);
    },
}

module.exports = { process }