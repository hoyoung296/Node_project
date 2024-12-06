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
const boardInsert = {
    write : async ( body ) => {
        const sql = `insert into board(write_no, title, contemt, origin_file_name, change_file_name, id) values(board_seq.nextval, :title, :content , :origin, :change, :id)`;
        let result = 0;
        try{
            result = await(await con).execute(sql, body);
        }catch(err){
            console.log( err )
        }
        return result;
    }
}
const boardUpdate = {
    upHit : async( num ) => {
        const sql = `update board set hit = hit +1 where write_no=${num}`;
        (await con).execute( sql );
    },
    delete : async(writeNo) => {
        const sql = `delete from board where write_no=${writeNo}`;
        (await con).execute( sql );
    },
    modify : async ( body ) => {
        const sql = `update board set title=:title, content=:content, origin_file_name=:origin_file_name, change_file_name=:change_file_name where write_no=:write_no`;
        return ( await cocn).execute( sql, body );
    }
}
module.exports = { boardUpdate, boardInsert, boardRead }