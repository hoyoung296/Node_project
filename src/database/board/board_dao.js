
const con = require("../db_common")

const boardRead = {
    list : async ( start ) => {
        const sql = `select * from board order by write_no desc offset ${start} rows fetch next 3 rows only`;
        const list = await ( await con ).execute( sql )
        return list;
    }
}
module.exports = { boardRead }