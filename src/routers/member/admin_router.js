const router = require("express").Router();
const adminCtrl = require("../../controller/member/admin_ctrl");

router.get("/memberlist",adminCtrl.process.memberlist);
// 경로 파라미터를 사용하는 방법
router.delete("/member_del/:uid", adminCtrl.process.memberdelete);
router.get("/boardlist",adminCtrl.process.boardlist);


module.exports = router;