const ser = require("../../service/member/admin_service")
const mctrl = require("../controller") //thema설정하려고 추가
const process = {
    memberlist: async (req, res) => {
        console.log("req.query.start : ", req.query.start);
        const thema = await mctrl.userThema(req.session) //사용자 테마 설정
        const data = await ser.process.ser_memberlist(req.query.start);
        res.render("admin/memberlist", { data: data,thema })
    },
    memberdelete: async (req, res) => {
        const uid = req.params.uid;  // URL 경로에서 uid를 가져옴
        console.log("Member ID to delete: ", uid);
        try {
            const msg = await ser.process.ser_memberdel(uid);
            res.json({ success: true, message: msg });
        } catch (err) {
            console.log("Error in deleting member: ", err);
            res.status(500).json({ success: false, error: "회원 삭제 실패" });
        }
    },
    boardlist : async (req, res) => {
        const data = await ser.process.ser_boardlist()
        console.log("data : ",data);
        res.render("admin/boardlist", { data: data })
    },
    boarddelete : async (req, res) => {
        const no = req.params.no;  // URL 경로에서 uid를 가져옴
        console.log("Member ID to delete: ", no);
        try {
            const msg = await ser.process.ser_boarddel(no);
            res.json({ success: true, message: msg });
        } catch (err) {
            console.log("Error in deleting member: ", err);
            res.status(500).json({ success: false, error: "게시글 삭제 실패" });
        }
    },
}

module.exports = { process }