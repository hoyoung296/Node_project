const multer = require('multer');
const ser = require("../../service/mypage/mypage_service");
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
        const userId = req.session.uid;
    
        console.log("Session Picture:", req.session.picture);  // 프로필 사진 출력
        console.log("Session Status Message:", req.session.statusMessage);  // 상태 메시지 출력
    
        try {
            if (!userId) {
                return res.send("<script>alert('로그인 후 이용해 주세요.'); location.href = '/member/login_form';</script>");
            }
    
            const userInfo = await ser.getUserInfo(userId);  // 사용자 정보 가져오기
    
            if (!userInfo) {
                return res.send("<script>alert('로그인 후 이용해 주세요.'); location.href = '/member/login_form';</script>");
            }
    
            // 세션에 저장된 프로필 사진과 상태 메시지가 있으면 덮어쓰기
            userInfo.picture = req.session.picture || 'default-profile.png';  // 세션에 프로필 사진 없으면 기본 이미지 사용
            userInfo.msg = req.session.statusMessage || '상태 메시지가 없습니다.'; // 세션에 상태 메시지 가져오기

            return res.render("mypage/main", { user: userInfo });  // 사용자 정보를 뷰로 전달
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
    
    // 프로필 수정 페이지
    getProfilePage: async (req, res) => {
        const userId = req.session.uid; // 세션에서 사용자 ID 가져오기
        try {
            const userInfo = await ser.getUserInfo(userId); // 사용자 정보 가져오기
            if (!userInfo) {
                return res.send("<script>alert('사용자 정보를 불러올 수 없습니다.'); history.back();</script>");
            }
            
            // 세션의 프로필 사진과 상태 메시지 반영
            userInfo.picture = req.session.picture || userInfo.picture || 'default-profile.png';  // 세션의 프로필 사진 반영
            userInfo.msg = req.session.statusMessage || userInfo.msg || '상태 메시지가 없습니다.'; // 세션의 상태 메시지 반영
            
            // 프로필 페이지 렌더링
            res.render("mypage/profile", { user: userInfo }); // userInfo를 뷰로 전달
        } catch (err) {
            res.send("Error: " + err.message); // 오류 발생 시 처리
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

    // 프로필 수정 처리
    updateProfile: async (req, res) => {
        const userId = req.session.uid;
        const statusMessage = req.body.statusMessage;
        const profilePic = req.file ? req.file.filename : null;  // 업로드된 파일이 있으면 파일 이름 저장

        console.log("업로드된 프로필 사진:", profilePic); // 업로드된 파일 정보 확인
        console.log("상태 메시지:", statusMessage); // 상태 메시지 확인
        
        try {
            if (profilePic) {
                await ser.updateProfilePic(userId, profilePic);  // 프로필 사진 업데이트
                req.session.picture = profilePic;  // 세션에 프로필 사진 업데이트
                console.log("세션에 저장된 프로필 사진:", req.session.picture); // 세션 값 확인
            }
            if (statusMessage) {
                await ser.updateStatusMessage(userId, statusMessage);  // 상태 메시지 업데이트
                req.session.statusMessage = statusMessage;  // 세션에 상태 메시지 업데이트
                console.log("세션에 저장된 상태 메시지:", req.session.statusMessage); // 세션 값 확인
            }

            // 세션 저장을 강제로 호출 (세션 데이터가 정확히 저장되도록)
            req.session.save(() => {
                console.log("세션 저장 후:", req.session);  // 세션 값 확인
                res.redirect("/mypage");  // 프로필 수정 후 마이페이지로 리다이렉트
            });

        } catch (err) {
            console.error("Error:", err);
            return res.send("<script>alert('프로필 수정에 실패했습니다.'); history.back();</script>");
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

    login: async (req, res) => {
        const userId = req.body.userId;
        const password = req.body.password;
        try {
            // 사용자 정보 가져오기 (DB에서 최신 정보 가져오기)
            const userInfo = await ser.getUserInfo(userId);
    
            // 로그인 실패 처리
            if (!userInfo || !await bcrypt.compare(password, userInfo.pwd)) {
                return res.send("<script>alert('로그인 실패'); location.href = '/member/login_form';</script>");
            }
    
            // 로그인 성공 시 세션에 최신 사용자 정보 저장
            req.session.uid = userInfo.id;
            req.session.name = userInfo.name;
            req.session.picture = userInfo.picture || 'default-profile.png'; 
            req.session.statusMessage = userInfo.msg || '상태 메시지가 없습니다.';

            // 세션 저장 후 리다이렉트
            req.session.save(() => {
                res.redirect('/mypage');  // 마이페이지로 리다이렉트
            });
        } catch (err) {
            console.error("Login error:", err);  // 로그인 관련 에러 출력
            return res.send("<script>alert('로그인 처리에 실패했습니다.'); location.href = '/member/login_form';</script>");
        }
    },

    // 로그아웃 처리
    logout: (req, res) => {
        // 세션의 사용자 정보만 초기화
        req.session.uid = null;
        req.session.name = null;
        req.session.picture = req.session.picture || 'default-profile.png';
        req.session.statusMessage = req.session.statusMessage || '상태 메시지가 없습니다.';
    
        // 로그아웃 후 메인 페이지로
        res.send("<script>alert('로그아웃되었습니다.'); location.href = '/';</script>");
    }
};

module.exports = { views, process, upload};