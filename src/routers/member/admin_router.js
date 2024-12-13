const router = require("express").Router();
const adminCtrl = require("../../controller/member/admin_ctrl");
const authMiddleware = require("../../../public/js/admin/authMiddleware");

// 특정 ID만 memberlist에 접근할 수 있도록 미들웨어 추가
router.get("/memberlist", authMiddleware, adminCtrl.process.memberlist);

// 다른 라우트들
router.delete("/member_del/:uid", authMiddleware, adminCtrl.process.memberdelete);
router.delete("/board_del/:no", authMiddleware, adminCtrl.process.boarddelete);
router.get("/boardlist",authMiddleware, adminCtrl.process.boardlist);

module.exports = router;
