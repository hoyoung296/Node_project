const ser = require("../../service/board/board_service")


const views = {//isLoggedIn: isLoggedIn 로그인 안하면 글쓰기 항목이 안보이는 코드 list.ejs에도 있음
    list : async ( req, res ) => {
        const data = await ser.boardRead.list( req.query.start );
        const isLoggedIn = req.session.user ? true : false;
        res.render( "board/list" ,{list : data.list, start : data.start, page : data.page, isLoggedIn: isLoggedIn })
        

    },
    writeForm : (req, res) => {
        const msg = serCom.sessionCheck( req.session );
        if( msg != 0 ){
            return res.send( msg );
        }
        res.render("board/write_from", {username : req.session.username})
    }
}
module.exports = { views }