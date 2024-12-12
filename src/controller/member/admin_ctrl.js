const ser = require("../../service/member/admin_service")
const process = {
    memberlist: async (req, res) => {
        const data = await ser.process.ser_memberlist()
        res.render("admin/memberlist", { data: data })
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
}

module.exports = { process }