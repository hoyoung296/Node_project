const con = require("../db_common")
const insert = {
    register : async (body) => {
        const sql = `insert into reply(id, name, content,reply_group, reply_no) values(:id, :title, : content,:write_no, reply_SEQ.nextval)`;
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