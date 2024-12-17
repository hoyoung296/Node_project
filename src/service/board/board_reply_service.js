const dao = require("../../database/board/board_reply_dao")
const insert = {
    register : async ( body ) => {
        const result = await dao.insert.register( body )
        return result.rowsAffected;
    }
}
const common = require("../ser_common");
const repRead = {
        data : async( num ) => {
            let result = await dao.repRead.data( num )
            result = common.timeModify( result.rows );
            console.log("result : ",result)
            return result;
        }
}
module.exports = {insert, repRead}