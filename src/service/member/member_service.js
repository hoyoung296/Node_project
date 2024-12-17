const dao = require("../../database/member/member_dao")
const serCom = require("../ser_common");
const emSend = require("./emailSend_service")
const bcrypt = require("bcrypt");

const process = {
    ser_insert: async (body) => {
        delete body.pwd2
        body.dotori = 0;
        body.pwd = await bcrypt.hash(body.pwd, 10);
        body.thema = 1;
        body.count = 0;
        const result = await dao.process.dao_insert(body)
        // console.log(body)
        if (result != 0) {
            msg = "회원 가입 성공";
            url = "/member/login_form";
        } else {
            msg = "회원 가입 실패";
            url = "/member/register_form";
        }
        return serCom.getMessage(msg, url);
    },
    ser_login: async (body, req, res) => {
        const result = await dao.process.dao_login(body.id)
        // console.log("login : ", result.rows[0].ID)

        const loginFail = await dao.process.selectLoginFailCount(body.id);

        console.log("loginFail : ", loginFail)

        if (result.rows.length == 0) {
            msg = "아이디 입력이 잘못되었습니다."
            url = "/member/login_form"
        } else {
            const admin = result.rows[0].ID;
            const isMatch = await bcrypt.compare(body.pwd, result.rows[0].PWD);
            let LoginFailCount = loginFail[0].LOGIN_FAIL_COUNT;
            let LoginFailTime = loginFail[0].LOGIN_FAIL_TIME;
            let currentTime = loginFail[0].CURRENT_TIME;
            if (isMatch) {
                if (LoginFailCount > 4) {
                    if (LoginFailTime > currentTime) {
                        msg = "비밀번호 5회 불일치, 10분 뒤 재시도해주시기 바랍니다."
                        url = "/member/login_form"
                    } else {
                        await dao.process.clearLoginFailCount(body.id);
                        req.session.uid = body.id;
                        req.session.name = result.rows[0].NAME
                        res.cookie("isLogin", true)
                        msg = "성공"
                        url = "/"
                    }
                } else {
                    if (admin == "admin") {
                        await dao.process.clearLoginFailCount(body.id);
                        req.session.uid = admin;
                        req.session.name = result.rows[0].NAME
                        res.cookie("isLogin", true)
                        msg = `${req.session.name}님이 로그인 성공`
                        url = "/"
                    } else {
                        await dao.process.clearLoginFailCount(body.id);
                        req.session.uid = body.id;
                        req.session.name = result.rows[0].NAME
                        res.cookie("isLogin", true)
                        msg = `${req.session.name}님이 로그인 성공`
                        url = "/"
                    }

                }
            } else {
                if (LoginFailCount > 4) {
                    if (LoginFailTime > currentTime) {
                        msg = "비밀번호 5회 불일치, 10분 뒤 재시도해주시기 바랍니다."
                        url = "/member/login_form"
                    } else {
                        await dao.process.clearLoginFailCount(body.id);
                        await dao.process.updateLoginFailCount(body.id);
                        const loginFail2 = await dao.process.selectLoginFailCount(body.id);
                        const LoginFailCount2 = loginFail2[0].LOGIN_FAIL_COUNT;
                        msg = `비밀번호 ${LoginFailCount2}회 불일치, 비밀번호를 정확히 입력해 주세요`;
                        url = "/member/login_form"
                    }
                } else {
                    await dao.process.updateLoginFailCount(body.id);
                    const loginFail2 = await dao.process.selectLoginFailCount(body.id);
                    const LoginFailCount2 = loginFail2[0].LOGIN_FAIL_COUNT;
                    msg = `비밀번호 ${LoginFailCount2}회 불일치, 비밀번호를 정확히 입력해 주세요`;
                    url = "/member/login_form"
                }
            }
        }
        return serCom.getMessage(msg, url);
    },
    ser_idCheck: async (uid) => {
        let result = await dao.process.dao_idCheck(uid);
        // console.log("dao.result",result)
        if (result.rows.length > 0) {
            result = { isAvailable: false };
        } else {
            result = { isAvailable: true };
        }
        // console.log("result : ", result)
        return result;
    },
    ser_emailCheck: async (email, uid) => {
        let result = await dao.process.dao_emailCheck(email, uid);
        // console.log("dao.email_result : ",result)
        if (result.rows.length > 0) {
            result = { isAvailable: true };
        } else {
            result = { isAvailable: false };
        }
        // console.log("result : ",result)
        return result
    },
    ser_emailSend: async (email, uid) => {
        const result = await emSend.sendTemporaryPassword(email, uid);
        // console.log("임시비밀번호 : ",result)
        // console.log("uid : ",email)
        // console.log("email : ",uid)
        if (result != undefined) {
            msg = "임시 비밀번호가 이메일로 전송되었습니다";
            url = "/member/login_form";

        } else {
            msg = "이메일 전송에 실패했습니다.";
            url = "/member/pwdsearch_form";
        }
        return serCom.getMessage(msg, url);
    },
    ser_emailCheck2: async (email) => {
        let result = await dao.process.dao_emailCheck2(email);
        console.log("dao.email_result : ", result)
        if (result.rows.length > 0) {
            rs = { isAvailable: true };
        } else {
            rs = { isAvailable: false };
        }
        // rs.uid = result.rows[0].id;
        // console.log("rs : ",rs)
        return rs
    },
    ser_idsearch: async (email) => {
        let result = await dao.process.dao_idsearch(email);
        console.log("id : ", result.rows[0].ID)
        rs = result.rows[0].ID
        // rs.uid = result.rows[0].id;
        // console.log("rs : ",rs)
        return rs
    },


}
module.exports = { process }