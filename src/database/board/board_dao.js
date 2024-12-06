const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config")
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;


const con = require("../db_common")
const boardRead = {
    list : async ( start ) => {
        const sql = `select * from board order by write_no desc offset ${start} rows fetch next 5 rows only`;
        const list = await ( await con ).execute( sql )
        return list;
    },
    totalCnt : async() => {
        let cnt;
        try{
            const con = await oracledb.getConnection(dbConfig);
            cnt = await con.execute(`select count(*) from board`); 
        }catch( err ){
            console.log( err )
        }
        return cnt;
    },
    data : async ( num ) => {
        const sql = `select * from board where write_no='${num}'`;
        const data = (await con).execute( sql );
        return data;
    }
}
module.exports = { boardRead }