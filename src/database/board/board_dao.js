const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config")
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;


const con = require("../db_common")
const boardRead = {
    list : async ( start ) => {
        const sql = `select * from board order by write_no desc offset ${start} rows fetch next 15 rows only`;
        const list = await ( await con ).execute( sql )
        console.log(list)
        return list;
    },
    list2 : async ( start,menu ) => {
        const sql = `select * from board where category = '${menu}' order by write_no desc offset ${start} rows fetch next 15 rows only`;
        const list = await ( await con ).execute( sql )
        console.log(list)
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
    oneCnt : async(menu) => {
        let cnt;
        try{
            const con = await oracledb.getConnection(dbConfig);
            cnt = await con.execute(`select count(*) from board where category= '${menu}'`); 
        }catch( err ){
            console.log( err )
        }
        return cnt;
    },
    data : async ( num ) => {
        const sql = `select * from board where write_no='${num}'`;
        const data = (await con).execute( sql );
        return data;
    },
     /**
     * 특정 사용자가 작성한 게시글 조회
     * @param {number} uid - 사용자 ID
     * @returns {Promise<Array>} 게시글 배열
     */
     myPosts: async (uid) => {
        const sql = `SELECT * FROM board WHERE ID = ? ORDER BY created_at DESC`;
        try {
            const result = await connection.execute(
                `SELECT write_no, title, created_at FROM board WHERE ID = :uid ORDER BY created_at DESC`,
                [uid] // 바인딩 변수 사용
            );
            return result.rows; // 게시글 목록 반환
        } catch (error) {
            console.error("DB Error:", error.message);
            throw error;
        } finally {
            await connection.close();
        }
    },
    // 기존 DAO 함수들 (예: 글쓰기, 수정, 삭제 등)...
}

const boardInsert = {
    write : async ( body ) => {
        const sql = `insert into board(write_no, title, content, upload_file, id, save_date, hit, name,category,change_file) values(board_seq.nextval, :title, :content, :origin, :id, SYSDATE, :hit, :name,:category,:change)`;
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
        const sql = `update board set hit = hit + 1 where write_no=${num}`;
        (await con).execute( sql );
    },
    delete : async(writeNo) => {
        const sql = `delete from board where write_no=${writeNo}`;
        (await con).execute( sql );
    },
    modify : async ( body ) => {
        const sql = `update board set title=:title, content=:content, upload_file=:upload_file, change_file=:change_file where write_no=:write_no`;
        return ( await con).execute( sql, body );
    }
}
module.exports = { boardUpdate, boardInsert, boardRead }