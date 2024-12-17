const ser = require("../../service/board/board_reply_service")
const process = {
    register : async ( req, res ) => {
        console.log("req.body : ",req.body)
        const result = await ser.insert.register( req.body );
        // console.log("ctrl result : ",result)
        res.json(result)
    },
    delete: async (req, res) => {
        const { reply_no } = req.params;
        try {
            await ser.boardrepUpdate.delete(reply_no);
            res.json({ success: true, message: "댓글이 삭제되었습니다." });
        } catch (err) {
            console.error("댓글 삭제 오류: ", err.message);
            res.status(500).json({ success: false, message: "댓글 삭제 중 오류가 발생했습니다." });
        }
    }
    
}
const views = {
    data : async ( req, res ) => {
        console.log("group : ", req.params.writeno )
        const result = await ser.repRead.data( req.params.writeno )
        // console.log("ctrl : ",result)
        res.json(result)
    }
}
module.exports = { process, views }