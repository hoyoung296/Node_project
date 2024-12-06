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
module.exports = { boardRead }