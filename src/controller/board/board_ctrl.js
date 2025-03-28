const ser = require("../../service/board/board_service")
const serCom = require("../../service/ser_common")
const path = require("path")
const ejs = require('ejs');
const mctrl = require("../controller") //thema설정하려고 추가

const views = {//isLoggedIn: isLoggedIn 로그인 안하면 글쓰기 항목이 안보이는 코드 list.ejs에도 있음 

    main : async (req, res) => {
        const thema = await mctrl.userThema(req.session) //사용자 테마 설정
        console.log(" req.query.start : ", req.query.start)
        const boardList = await ser.boardRead.list( req.query.start );
        const isLoggedIn = req.session.user ? true : false;
        // console.log("data : ",boardList.list)
        const data = { list : boardList.list, start : boardList.start, page : boardList.page, isLoggedIn,thema,username : req.session.username }
        ejs.renderFile(path.join(__dirname, '../../views/board/main_list.ejs'), data, (err, str) => {
            if(err){
                console.log(err)
                return res.status(500).send('Error rendering EJS')
            }
            res.send(str)
        })
        // res.json({ list : data.list, start : data.start, page : data.page, isLoggedIn })
    }, 
    topic : async (req, res) => {
        const menu = req.query.menu;
        console.log("menu :",menu)
        const boardList = await ser.boardRead.list2( req.query.start,menu );
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
    category: async (req, res) => {
        const thema = await mctrl.userThema(req.session) //사용자 테마 설정
        const topic = req.params.category
        const menu = req.query.menu
        res.render("board/categori", {thema,topic,menu})
    },

    list : async ( req, res ) => {
        const thema = await mctrl.userThema(req.session) //사용자 테마 설정
        const data = await ser.boardRead.list( req.query.start );
        const isLoggedIn = req.session.user ? true : false;
        res.render( "board/list", {list : data.list, start : data.start, page : data.page, isLoggedIn: isLoggedIn, thema })
    },
    writeForm : async (req, res) => {
        const thema = await mctrl.userThema(req.session)
        console.log(req.session)
        const msg = serCom.sessionCheck( req.session );
        if( msg != 0 ){
            return res.send( msg )
        }
        res.render("board/write_form", {username : req.session.name, thema})
    },
    data : async ( req, res) => {

        const data = await ser.boardRead.data( req.params.num );

        const thema = await mctrl.userThema(req.session)
        // console.log("data : ",data)
        const username = req.session.name;
        console.log("username : ",req.session)
        res.render("board/data", { data , username, thema } );
    },
    modifyForm : async ( req, res ) => {
        const thema = await mctrl.userThema(req.session)
        const data = await ser.boardRead.data( req.params.writeNo );
        res.render("board/modify_form", {data, thema});
    }
}
const process = {

    write: async (req, res) => {
        console.log(req.body)
        const msg = await ser.boardInsert.write(
            req.body, req.file, req.fileValidation, req.session.uid,req.session.name
        );
        res.send( msg )
    },
    delete: (req, res) => {
        file_process.delete(req.params.imgName);
        const msg = ser.boardUpdate.delete(req.params.writeNo);
        res.send(msg);
    },
    modify : async ( req, res) => {
        const deleteFile = req.body.change_file;
        const message = await ser.boardUpdate.modify( req. body, req.file );
        if( req.file !== undefined && message.result ===1 ){
            file_process.delete( deleteFile );
        }
        res.send(message.msg );
    }
}
const fs = require("fs");
const file_process = {

    download: (req, res) => {
        console.log("req.params.imgName : ", req.params.imgName)
        const filePath = `./upload_file/${req.params.imgName}`;
        res.download( filePath )
    },
    delete : ( imgName ) => {
        if( imgName !== 'nan'){
            fs.unlinkSync(`./upload_file/${ imgName }`);
        }
    } 
}
module.exports = { file_process, process, views }