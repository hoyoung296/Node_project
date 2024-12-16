const { AQ_MSG_STATE_WAITING } = require("oracledb");
const dao = require("../../database/board/board_dao")
const serCom = require("../ser_common")

const boardRead = {
    list : async (start) => {
        if( start == undefined )
            start = 1;
        start = Number(start);

        const totalCnt = await dao.boardRead.totalCnt();
        const num = totalCnt.rows[0]['COUNT(*)'];
        const result = ( num % 15 == 0 )? 0 : 1;
        const page = parseInt( num / 15 + result );

        const startNum = ( start - 1 ) * 15;
        let list = await dao.boardRead.list( startNum );
        console.log(list.rows[0])
        list = serCom.timeModify( list.rows )
        return { list, start, page };
    },
    list2 : async (start,menu) => {
        if( start == undefined )
            start = 1;
        start = Number(start);

        const totalCnt = await dao.boardRead.oneCnt(menu);
        const num = totalCnt.rows[0]['COUNT(*)'];
        const result = ( num % 15 == 0 )? 0 : 1;
        const page = parseInt( num / 15 + result );

        const startNum = ( start - 1 ) * 15;
        let list = await dao.boardRead.list2( startNum,menu );
        console.log(list.rows[0])
        list = serCom.timeModify( list.rows )
        return { list, start, page };
    },
    data : async ( num ) => {
        boardUpdate.upHit( num );
        let data = await dao.boardRead.data( num )
        data = serCom.timeModify( data.rows );
        return data[0];
    },
    /**
     * 사용자의 게시글 목록 조회
     * @param {number} uid - 로그인된 사용자 ID
     * @returns {Promise<Array>} 게시글 배열
     */
    myPosts : async (uid) => {
        try {
            const posts = await dao.getPostsByUserId(uid);  // 사용자 ID로 게시글 조회
            return posts;
        } catch (error) {
            console.error("게시글 조회 중 오류 발생:", error.message);
            throw new Error("게시글을 가져오는 중 오류가 발생했습니다.");
        }
    },
    
    // 기존 서비스 함수들 (예: 글쓰기, 수정, 삭제 등)...
}
const boardInsert = {
    write : async ( body, file, fileValidation, uid,name ) => {
        console.log( file )
        let msg, url;
        if( fileValidation ){
            msg = fileValidation;
            url = "/board/write_form"
            return serCom.getMessage(msg, url );
        }
        if( file != undefined ){
            body.origin = file.originalname;
            body.change = file.filename;
        }else{
            body.origin = "nan";
            body.change = "nan";
        }
        body.hit = 0;
        body.id = uid
        body.name = name
        // body.save_data =new Date().toISOString().slice(0, 10);
        console.log(body)
        const result = await dao.boardInsert.write( body );
        if( result != 0 ){
            msg = "등록 성공하였습니다"
            url = "/";
        }
        else{
            msg = "문제가 발생하였습니다"
            url = "/board/write_form";
        }
        return serCom.getMessage( msg, url );
    }
}
const boardUpdate = {
    upHit : ( num ) => {
       dao.boardUpdate.upHit( num );
    },
    delete : ( writeNo ) => {
        dao.boardUpdate.delete( writeNo );
    },
    modify : async ( body, file ) => {
        if( file !== undefined ){
            body.upload_file = file.originalname;
            body.change_file = file.filename;
        }
        const result = await dao.boardUpdate.modify( body );
        let msg, url;
        let message = {}
        message.result = result.rowsAffected;
        if( message.result === 1){
            msg = "수정 완료"
            url = `/board/data/${body.write_no}`;
        }else{
            msg = "문제 발생"
            url = `/board/modify_form/${body.write_no}`;
            message.result = 0;
        }    
        message.msg = serCom.getMessage(msg, url);
        return message;  
    }
   

}
module.exports = {boardUpdate, boardInsert, boardRead }