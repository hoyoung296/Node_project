const ser = require("../../service/board/board_reply_service")
const process = {
    register : async ( req, res ) => {
        console.log(req.body );
        const result = await ser.insert.register( req.body );
        console.log("ctrl result : ",result)
        res.json(result)
    }
}
const views = {
    data : async ( req, res ) => {
        console.log("group : ", req.params.writeno )
        const result = await ser.repRead.data( req.params.writeno )
        console.log("ctrl : ",result)
        res.json(result)
    }
}
module.exports = { process, views }