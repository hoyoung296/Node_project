const ser = require("../../service/board/board_service")
const serCom = require("../../service/ser_common")
const path = require("path")
const ejs = require('ejs');

const views = {//isLoggedIn: isLoggedIn 로그인 안하면 글쓰기 항목이 안보이는 코드 list.ejs에도 있음 

    main : async (req, res) => {
        const boardList = await ser.boardRead.list( req.query.start );
        const isLoggedIn = req.session.user ? true : false;
        const data = { list : boardList.list, start : boardList.start, page : boardList.page, isLoggedIn }
        ejs.renderFile(path.join(__dirname, '../../views/board/main_list.ejs'), data, (err, str) => {
            if(err){
                console.log(err)
                return res.status(500).send('Error rendering EJS')
            }
            res.send(str)
        })
        // res.json({ list : data.list, start : data.start, page : data.page, isLoggedIn })
    },

    list : async ( req, res ) => {
        const data = await ser.boardRead.list( req.query.start );
        const isLoggedIn = req.session.user ? true : false;
        res.render( "board/list", {list : data.list, start : data.start, page : data.page, isLoggedIn: isLoggedIn })
    },
    writeForm : (req, res) => {
        console.log(req.session)
        const msg = serCom.sessionCheck( req.session );
        if( msg != 0 ){
            return res.send( msg )
        }
        res.render("board/write_form", {username : req.session.name})
    },
    data : async ( req, res) => {
        const data = await ser.boardRead.data( req.params.num );
        const username = req.session.username;
        res.render("board/data", { data , username } );
    },
    modifyForm : async ( req, res ) => {
        const data = await ser.boardRead.datta( req.query.writeNo );
        res.render("board/modify_form", {data});
    }
}
const process = {
    write : async ( req, res ) => {
        const msg = await ser.boardInsert.write(
            req.body, req.file, req.fileValidation, req.session.uid
        );
        res.send( msg )
    },
    delete : ( req, res ) => {
        file_process.delete( req.query.imgName);
        ser.boardUpdate.delete( req.query.writeNo);
        res.redirect("/board/list");
    },
    modify : async ( req, res) => {
        const deleteFile = req.body.upload_file;
        const message = await ser.boardUpdate.modify( req. body, req.file );
        if( req.file !== undefined && message.result ===1 ){
            file_frocess.delete( deleteFile );
        }
        res.send(message.msg );
    }
}
const fs = require("fs");
const file_process = {
    download : ( req, res ) => {
        const filePath = `./upload_file/${req.query.imgName}`;
        res.download( filePath )
    },
    delete : ( imgName ) => {
        if( imgName !== 'nan'){
            fs.unlinkSync(`./upload_file/${ imgName }`);
        }
    } 
}
module.exports = { file_process, process, views }