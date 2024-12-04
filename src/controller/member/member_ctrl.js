// const {validationResult} = require('express-validator');
const ser = require("../../service/member/member_service")

const views ={
    registerForm : (req,res) => {
        res.render("member/registerForm")
    },
    loginForm : (req,res) => {
        res.render("member/loginForm")
    },
    
}

const process = {
    // register  : (req,res) => {
    //     // 유효성 검사에서 생성된 에러를 errors 변수로 받는다
    //     const errors = validationResult(req);
    //     // 유효성 검사에서 생성된 에러가 있는 경우
    //     // 400 상태코드와 함께 에러들을 반환한다.
    //     if (!errors.isEmpty()) {
    //         return res.send(errors.array().map(error => error.msg));
    //     }
    //     // 유효성 검사를 통과한 경우
    //     // 유저를 DB에 추가한다 (본 프로젝트에서는 DB가 아닌 서버 메모리에서 처리함)
    //     const { email, password } = req.body;

    //     const userInfo = {
    //         email,
    //         password,
    //     }

    //     const user = ser.process.insert(userInfo,);

    //     res.status(201).send({
    //         success: true,
    //         message: `user is created`,
    //         data: user,
    //     })
    // }
    register  : async(req,res) => {
        const msg = await ser.process.ser_insert(req.body);
        res.send(msg)
    },
    loginCheck : async(req,res) => {
        const msg = await ser.process.ser_login( req.body , req , res );
        res.send(msg)
    },
    logout : (req, res) => {
        req.session.destroy();
        res.clearCookie('isLogin')
        res.redirect("/")
    },
    idCheck : async(req,res) => {
        // console.log(req.query)
        const uid = req.query.uid;

        const result = await(ser.process.ser_idCheck(uid))
        console.log("result : ",result)

        return res.json(result)

    }
    
}
module.exports = { process,views }