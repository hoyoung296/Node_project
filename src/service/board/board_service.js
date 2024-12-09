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
        const result = ( num % 5 == 0 )? 0 : 1;
        const page = parseInt( num / 5 + result );

        const startNum = ( start - 1 ) * 5;
        let list = await dao.boardRead.list( startNum );
        list = serCom.timeModify( list.rows )
        return { list, start, page };
    },
    data : async ( num ) => {
        boardUpdate.upHit( num );
        data = serCom.timeModify( data.rows );
        return data[0];
    }
}
const boardInsert = {
    write : async ( body, file, fileValidation ) => {
        console.log( file )
        let msg, url;
        if( fileValidation ){
            msg = filefileValidation;
            url = "/board/write_form"
            return serCom.getMessage(msg, url );
        }
        if( file != undefined ){
            body.origin = file.originalname;
            boar.change = file.filename;
        }else{
            body.origin = "파일 없음";
            boar.change = "파일 없음";
        }
        const result = await dao.boardInser.write( body );
        if( result != 0 ){
            msg = "등록 성공하였습니다"
            url = "/board/list";
        }
        else{
            msg = "문제가 발생하였습니다"
            url = "/board/write_form";
        }
        return serCom.getMessage( msg, url );
    }
}
const boardUpdatd = {
    upHit : ( num ) => {
        dao.boardUpdate.upHit( num );
    },
    delete : ( writeNo ) => {
        dao.boardupdate.delete( writeNo );
    },
    modify : async ( body, file ) => {
        if( file !== undefined ){
            body.origin = file.originalname;
            boar.change = file.filename;
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
module.exports = {boardUpdatd, boardInsert, boardRead }