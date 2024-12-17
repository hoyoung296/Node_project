const multer = require('multer');
const ser = require("../../service/mypage/mypage_service");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const mctrl = require("../controller") //thema설정하려고 추가

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');  // 업로드된 파일을 저장할 경로
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);  // 파일 이름
    }
});

// 업로드 미들웨어 설정
const upload = multer({ storage: storage });

// 비밀번호 해시화
const hashPassword = async (password) => {
    const hashedPwd = await bcrypt.hash(password, saltRounds);
    return hashedPwd;
};

const views = {
    // 마이페이지 메인화면
    getMainPage: async (req, res) => {
        const thema = await mctrl.userThema(req.session); // 사용자 테마 설정
        const userId = req.session.uid;
    
        try {
            if (!userId) {
                return res.send("<script>alert('로그인 후 이용해 주세요.'); location.href = '/member/login_form';</script>");
            }
    
            // DB에서 최신 사용자 정보 가져오기
            const userInfo = await ser.getUserInfo(userId);
    
            if (!userInfo) {
                return res.send("<script>alert('사용자 정보를 불러올 수 없습니다.'); location.href = '/member/login_form';</script>");
            }

            console.log("메인페이지 세션 프로필 사진:", userInfo.MSG); // 확인용 로그
    
            // 마이페이지 렌더링
            res.render("mypage/main", { user: userInfo, thema });
        } catch (err) {
            console.error("Error in getMainPage:", err);
            res.send("Error: " + err.message);
        }
    },

    // 개인정보 수정 페이지
    getEditPage: async (req, res) => {
        const thema = await mctrl.userThema(req.session) //사용자 테마 설정
        const userId = req.session.uid;
        try {
            const userInfo = await ser.getUserInfo(userId);
            res.render("mypage/edit", { user: userInfo, thema });
        } catch (err) {
            res.send("Error: " + err.message);
        }
    },
    
    // 프로필 수정 페이지
    getProfilePage: async (req, res) => {
        const thema = await mctrl.userThema(req.session) //사용자 테마 설정
        const userId = req.session.uid; // 세션에서 사용자 ID 가져오기
        try {
            const userInfo = await ser.getUserInfo(userId); // 사용자 정보 가져오기
            if (!userInfo) {
                return res.send("<script>alert('사용자 정보를 불러올 수 없습니다.'); history.back();</script>");
            }
            
            // 프로필 페이지 렌더링
            res.render("mypage/profile", { user: userInfo, thema }); // userInfo를 뷰로 전달
        } catch (err) {
            res.send("Error: " + err.message); // 오류 발생 시 처리
        }
    },

    // 회원탈퇴 페이지
    getDeletePage: async (req, res) => {
        const thema = await mctrl.userThema(req.session); // 사용자 테마 설정
        res.render("mypage/delete", { thema }); // 단일 변수 'thema'로 전달
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

    // 프로필 수정 처리
    updateProfile: async (req, res) => {
        const userId = req.session.uid;
        const statusMessage = req.body.statusMessage;
        const profilePic = req.file ? req.file.filename : null;
    
        try {
            if (profilePic) {
                await ser.updateProfilePic(userId, profilePic); // DB 업데이트
                req.session.picture = profilePic; // 세션 동기화
            }
            if (statusMessage) {
                await ser.updateStatusMessage(userId, statusMessage);
                req.session.statusMessage = statusMessage;
            }
    
            // 세션 저장 후 리다이렉트
            req.session.save(() => {
                console.log("프로필 수정 후 세션 값:", req.session);
                res.redirect("/mypage");
            });
        } catch (err) {
            console.error("Error updating profile:", err);
            res.send("<script>alert('프로필 수정에 실패했습니다.'); history.back();</script>");
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
    }
};

module.exports = { views, process, upload};