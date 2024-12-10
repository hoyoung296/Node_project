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
router.post("/check-email",memberCtrl.process.emailCheck)
router.get("/pwdsearch_form", memberCtrl.views.pwdsearchForm)
router.post("/pwdsearch_checkform", memberCtrl.views.pwdsearch_checkForm)
router.post("/send-email",memberCtrl.process.sendEmail)
router.get("/idsearch_form",memberCtrl.views.idsearchForm)
router.post("/sendEmail",memberCtrl.process.sendEmail2)
router.post("/verifyEmail",memberCtrl.process.verifyEmail)
router.get("/idview",memberCtrl.views.idview)



module.exports = router;