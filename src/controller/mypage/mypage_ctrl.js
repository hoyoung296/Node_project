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
        console.log("세션에서 가져온 userId:", userId);
        try {
            if (!userId) {
                return res.send("<script>alert('로그인 후 이용해 주세요.'); location.href = '/member/login_form';</script>");
            }

            const userInfo = await ser.getUserInfo(userId); // 사용자의 기본 정보 가져오기

            console.log(userInfo);
            
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
        const { currentPwd, pwd, name, addr, phone, email } = req.body;
        const userId = req.session.uid;  // 현재 로그인된 사용자의 ID (세션에서 가져옴)

        try {
            // 1. 현재 비밀번호가 맞는지 확인
            const userInfo = await ser.getUserInfo(userId);  // DB에서 사용자 정보 가져오기
            const isPasswordValid = await bcrypt.compare(currentPwd, userInfo.PWD);  // 입력한 비밀번호와 DB의 비밀번호 비교
    
            // 비밀번호가 틀린 경우
            if (!isPasswordValid) {
                return res.send("<script>alert('현재 비밀번호가 틀립니다.'); history.back();</script>");
            }
    
            // 2. 새 비밀번호 입력x시, 기존 비밀번호 유지
            let hashedPwd = null;
            if (pwd) {
                hashedPwd = await hashPassword(pwd);  // 비밀번호 해시화
            } else {
                hashedPwd = userInfo.PWD;  // 비밀번호가 변경x이므로 기존 비밀번호 유지
            }
    
            // 3. 사용자 정보 수정
            await ser.updatePersonalInfo(userId, userId, hashedPwd, name, addr, phone, email);
            res.send("<script>alert('정보가 수정되었습니다.'); location.href = '/';</script>");
        } catch (err) {
            return res.send("<script>alert('정보 수정에 실패했습니다.'); history.back();</script>");
        }
    },

    // 회원탈퇴 처리
    deleteUser: async (req, res) => {
        const userId = req.session.uid;
        const { currentPwd, confirmPwd } = req.body;

        try {
            // 비밀번호 확인
            if (currentPwd !== confirmPwd) {
                return res.send("<script>alert('비밀번호가 일치하지 않습니다.'); history.back();</script>");
            }

            // 비밀번호가 일치하면 DB에서 사용자 정보 가져오기
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
    },

    // 로그아웃 처리
    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return res.send("<script>alert('로그아웃 처리에 실패했습니다.'); history.back();</script>");
            }
            // 로그아웃 후 메인 페이지로
            return res.send("<script>alert('로그아웃되었습니다.'); location.href = '/';</script>");
        });
    }
};

module.exports = { views, process };