const ser = require("../../service/mypage/mypage_service");

const views = {
    // 개인정보 수정 페이지
    getEditPage : async (req, res) => {
        const userId = req.session.uid;
        try {
            const userInfo = await ser.getUserInfo(userId);
            res.render("mypage/edit", {user: userInfo});
        } catch(err) {
            res.send("Error: " + err.message);
        }
    },
    // 회원탈퇴 페이지
    getDeletePage : (req, res) => {
        res.render("mypage/delete");
    }
};

const process = {
    // 개인정보 수정 처리
    updateInfo : async (req, res) => {
        const { id, pwd, name, addr, phone, email } = req.body;
        const userId = req.session.uid;
        try {
            await ser.updatePersonalInfo(userId, id, pwd, name, addr, phone, email);
            res.send("<script>alert('정보가 수정되었습니다.'); location.href = '/member/main';</script>")
        } catch(err) {
            res.send("<script>alert('정보 수정에 실패했습니다.'); history.back();</script>");
        }
    },
    // 회원탈퇴 처리
    deleteUser: async (req, res) => {
        const userId = req.session.uid;
        try {
            await ser.deleteUser(userId);
            req.session.destroy(() => {
                res.send("<script>alert('회원 탈퇴가 완료되었습니다.'); location.href = '/';</script>");
            });
        } catch (err) {
            res.send("<script>alert('회원 탈퇴에 실패했습니다.'); history.back();</script>");
        }
    }
};

module.exports = {views, process};