const ser = require("../../service/board/board_service")

const views = {
    list : async ( req, res ) => {
        const data = await ser.boardRead.list( req.query.start );
        res.render( "board/list" ,{list : data.list, start : data.start, page : data.page})
    }
}
module.exports = { views }