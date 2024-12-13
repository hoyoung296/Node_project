const con = require("../db_common")
const insert = {
    register : async (body) => {
        const sql = `insert into reply values(reply_SEQ.nextval, :id, : content, sysdate, :groupNum )`;
        let result = 0;
        try{
            result = await(await con).execute(sql, body);
        }catch ( err ){
            console.log(err);
        }
        console.log(result);
        return result;
    }
}
const repRead = {
    data : async( num ) => {
        const sql = `select * from reply where reply_group=${num}`;
        const result = await ( await con).execute(sql);
        return result;
    }
}
module.exports = {insert, repRead }