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

    },
    sendEmail: async (req, res) => {
        try {
            console.log("uid :", req.body.uid);
            console.log("email :", req.body.email);
            
            const email = req.body.email;
            const uid = req.body.uid;
    
            // 이메일 체크 결과
            const result = await ser.process.ser_emailCheck(email,uid);
            
            let msg;
            
            // console.log("컨트롤러 result: ",result)
            // 이메일 존재 여부 확인 후 이메일 전송 처리
            if (result.isAvailable) {
                // 이메일 전송 함수 호출 후 결과 메시지 받기
                msg = await ser.process.ser_emailSend(email,uid);
            } else {
                // 이메일이 존재하지 않으면 경고 메시지
                msg = `<script>
                    alert('이메일이 존재하지 않습니다.');
                    location.href = '/member/pwdsearch_form'; // 여기에 리디렉션할 URL을 지정
                </script>`;
            }
    
            // 결과 메시지 전송
            res.send(msg);
        } catch (error) {
            console.error('Error occurred:', error);
            res.status(500).send(`
                <script>
                    alert('서버 오류가 발생했습니다.');
                    location.href = '/member/login_form'; // 오류 처리 후 리디렉션
                </script>
            `);
        }
    }
    
}
module.exports = { process,views }