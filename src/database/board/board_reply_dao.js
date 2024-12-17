const con = require("../db_common")
const insert = {
    register : async (body) => {
        const sql = `INSERT INTO reply (reply_no, id, content, reply_group, save_date) 
             VALUES (reply_SEQ.nextval, :id, :content, :reply_group, SYSDATE)`;
        let result = 0;
        try{
            result = await(await con).execute(sql, body);
        }catch ( err ){
            console.log(err);
        }
        // console.log(result);
        return result;
    }
}
const repRead = {
    data : async( num ) => {
        const sql = `select * from reply where reply_group=${num} ORDER BY save_date desc`;
        const result = await ( await con).execute(sql);
        return result;
    }
}
module.exports = {insert, repRead }