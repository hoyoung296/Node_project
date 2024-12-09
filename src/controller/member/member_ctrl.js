const ser = require("../../service/member/member_service")
const authService = require("../../service/member/emailSend_service")

const views = {
    registerForm: (req, res) => {
        res.render("member/registerForm")
    },
    loginForm: (req, res) => {
        res.render("member/loginForm")
    },
    pwdsearchForm: (req, res) => {
        res.render("member/pwdsearchForm")
    },
    pwdsearch_checkForm: (req, res) => {
        const uid = req.query.uid
        res.render("member/pwdsearchcheckForm", { uid: uid })
    },
    idsearchForm: (req, res) => {
        res.render("member/idsearchForm")
    },
    idview : (req, res) => {
        const uid = req.query.uid;  // 쿼리 파라미터에서 uid를 가져옴
        res.render("member/idview", { uid: uid });  // uid를 템플릿에 전달
    }
}

const process = {
    register: async (req, res) => {
        const msg = await ser.process.ser_insert(req.body);
        res.send(msg)
    },
    loginCheck: async (req, res) => {
        const msg = await ser.process.ser_login(req.body, req, res);
        res.send(msg)
    },
    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie('isLogin')
        res.redirect("/")
    },
    idCheck: async (req, res) => {
        // console.log(req.query)
        const uid = req.query.uid;

        const result = await (ser.process.ser_idCheck(uid))
        console.log("result : ", result)

        return res.json(result)

    },
    sendEmail: async (req, res) => {
        try {
            console.log("uid :", req.body.uid);
            console.log("email :", req.body.email);

            const email = req.body.email;
            const uid = req.body.uid;

            // 이메일 체크 결과
            const result = await ser.process.ser_emailCheck(email, uid);

            let msg;

            // console.log("컨트롤러 result: ",result)
            // 이메일 존재 여부 확인 후 이메일 전송 처리
            if (result.isAvailable) {
                // 이메일 전송 함수 호출 후 결과 메시지 받기
                msg = await ser.process.ser_emailSend(email, uid);
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
    },
    sendEmail2: async (req, res) => {
        console.log("email :", req.body.email);
    
        const email = req.body.email;
        try {
            // 이메일 체크 결과
            const result = await ser.process.ser_emailCheck2(email);
    
            let msg;
            console.log("resultC:", result);
    
            if (result.isAvailable) {
                try {
                    // 서비스 계층에서 이메일 발송과 인증번호 생성을 처리
                    const rs = await authService.sendVerificationEmail(email);
    
                    // 인증번호와 만료 시간을 세션에 저장
                    req.session.verificationCode = rs.verificationCode;
                    req.session.email2 = email;
                    req.session.expirationTime = rs.expirationTime;  // 만료 시간을 세션에 추가
                    const expirationTime = rs.expirationTime;
                    console.log("rs: ", rs);
    
                    // 이메일 발송 성공 시 성공 메시지와 상태 반환
                    return res.json({ message: '인증번호가 발송되었습니다. 이메일을 확인하세요.', emailSent: true,expirationTime: expirationTime  });
                } catch (error) {
                    console.log(error);
                    // 이메일 발송 실패 시 실패 메시지 반환
                    return res.json({ message: '이메일 발송에 실패했습니다.', emailSent: false });
                }
            } else {
                // 이메일이 존재하지 않으면 경고 메시지
                msg = { message: '이메일이 존재하지 않습니다.', emailSent: false };
                return res.json(msg);
            }
        } catch (error) {
            console.error('Error occurred:', error);
            res.status(500).json({ message: '서버 오류가 발생했습니다.' });
        }
    },
    
    verifyEmail: async (req, res) => {
        const emailCheck = req.body.emailcheck;  // 클라이언트에서 입력한 인증번호
        const verificationCode = req.session.verificationCode;  // 세션에 저장된 인증번호
        const expirationTime = req.session.expirationTime;  // 세션에 저장된 만료 시간
        const email = req.session.email2;  // 세션에 저장된 이메일
    
        // console.log("verify: ", req.session.email2);
    
        // 만료 시간이 지나지 않았는지 확인
        const currentTime = Date.now();
        // console.log("currentTime : ",currentTime)
        // console.log("expirationTime : ",expirationTime)
        if (currentTime > expirationTime) {
            // 인증번호가 만료되었으면
            return res.json({ success: false, message: '인증번호가 만료되었습니다. 다시 시도해주세요.' });
        }
    
        // 서비스 계층에서 인증번호 확인
        if (authService.verifyEmailCode(emailCheck, verificationCode,expirationTime)) {
            const uid = await ser.process.ser_idsearch(email);
            // 인증 성공 시 클라이언트에 응답
            return res.json({ success: true, message: '인증 성공! 로그인하세요.', uid: uid });
        } else {
            // 인증 실패 시 클라이언트에 응답
            return res.json({ success: false, message: '인증 실패, 다시 시도해주세요.' });
        }
    }
    


}
module.exports = { process, views }