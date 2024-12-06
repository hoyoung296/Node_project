const router = require("express").Router();
// const {check, } = require('express-validator');
const memberCtrl = require("../../controller/member/member_ctrl");

router.get("/",memberCtrl.views.loginForm);
router.get("/register_form", memberCtrl.views.registerForm);
router.post("/register", memberCtrl.process.register);
router.get("/login_form", memberCtrl.views.loginForm)
router.post("/login_check", memberCtrl.process.loginCheck)
router.get("/logout", memberCtrl.process.logout )
router.get("/check-id",  memberCtrl.process.idCheck)
router.get("/pwdsearch_form", memberCtrl.views.pwdsearchForm)
router.post("/pwdsearch_checkform", memberCtrl.views.pwdsearch_checkForm)
router.post("/send-email",memberCtrl.process.sendEmail)


module.exports = router;