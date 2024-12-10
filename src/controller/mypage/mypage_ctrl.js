const ser = require("../../service/mypage/mypage_service");
const bcrypt = require('bcrypt');
const saltRounds = 10;

// 비밀번호 해시화
const hashPassword = async (password) => {
    const hashedPwd = await bcrypt.hash(password, saltRounds);
    return hashedPwd;
};

const views = {
    // 마이페이지 메인화면
    getMainPage: async (req, res) => {
        const userId = req.session.uid;
        try {
            if (!userId) {
                return res.send("<script>alert('로그인 후 이용해 주세요.'); location.href = '/member/login_form';</script>");
            }

            const userInfo = await ser.getUserInfo(userId); // 사용자의 기본 정보 가져오기
            
            if (!userInfo) {
                return res.send("<script>alert('로그인 후 이용해 주세요.'); location.href = '/member/login_form';</script>");
            }

            return res.render("mypage/main", { user: userInfo });
        } catch (err) {
            return res.send("Error: " + err.message);
        }
    },

    // 개인정보 수정 페이지
    getEditPage: async (req, res) => {
        const userId = req.session.uid;
        try {
            const userInfo = await ser.getUserInfo(userId);
            res.render("mypage/edit", { user: userInfo });
        } catch (err) {
            res.send("Error: " + err.message);
        }
    },
    // 회원탈퇴 페이지
    getDeletePage: (req, res) => {
        res.render("mypage/delete");
    }
};

const process = {
    // 개인정보 수정 처리
    updateInfo: async (req, res) => {
        const { id, pwd, name, addr, phone, email } = req.body;
        const userId = req.session.uid;  // 현재 로그인된 사용자의 ID (세션에서 가져옴)

        try {
            let hashedPwd = null;

            // 비밀번호가 수정된 경우, 비밀번호 해시화
            if (pwd) {
                hashedPwd = await hashPassword(pwd);  // 비밀번호 해시화
            }

            // 사용자 정보 수정 (id는 수정x)
            await ser.updatePersonalInfo(userId, userId, hashedPwd, name, addr, phone, email);

            res.send("<script>alert('정보가 수정되었습니다.'); location.href = '/';</script>");
        } catch (err) {
            res.send("<script>alert('정보 수정에 실패했습니다.'); history.back();</script>");
        }
    },

    // 회원탈퇴 처리
    deleteUser: async (req, res) => {
        const userId = req.session.uid;
        const { currentPwd } = req.body;

        try {
            // 사용자가 입력한 비밀번호와 현재 저장된 비밀번호 비교
            const userInfo = await ser.getUserInfo(userId);  // DB에서 사용자 정보 가져오기
            const isPasswordValid = await bcrypt.compare(currentPwd, userInfo.PWD);  // 입력한 비밀번호와 DB의 비밀번호 비교

            if (isPasswordValid) {
                await ser.deleteUser(userId);
                req.session.destroy(() => {
                    res.send("<script>alert('회원 탈퇴가 완료되었습니다.'); location.href = '/';</script>");
                });
            } else {
                res.send("<script>alert('비밀번호가 틀립니다.'); history.back();</script>");
            }
        } catch (err) {
            res.send("<script>alert('회원 탈퇴에 실패했습니다.'); history.back();</script>");
        }
    }
};

module.exports = { views, process };