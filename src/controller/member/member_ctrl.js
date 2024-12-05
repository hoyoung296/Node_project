const ser = require("../../service/member/member_service")

const views ={
    registerForm : (req,res) => {
        res.render("member/registerForm")
    },
    loginForm : (req,res) => {
        res.render("member/loginForm")
    },
    pwdsearchForm : (req,res) => {
        res.render("member/pwdsearchForm")
    },
    pwdsearch_checkForm : (req,res) => {
        const uid = req.query.uid
        res.render("member/pwdsearchcheckForm",{uid:uid})
    },
}

const process = {
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