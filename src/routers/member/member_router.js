const router = require("express").Router();
// const {check, } = require('express-validator');
const memberCtrl = require("../../controller/member/member_ctrl");

router.get("/",memberCtrl.views.loginForm);
router.get("/register_form", memberCtrl.views.registerForm);
// router.post("/register",[
//     check('email') // email 파라미터 유효성 검사
//     .notEmpty() // 1. 파라미터가 비어있으면 에러
//     .withMessage(`이메일값이 비어있습니다.`)
//     .isEmail() // 2. 파라미터가 이메일 형식이 아니면 에러
//     .withMessage(`이메일형식이 아닙니다`)
// ,
// check('pwd') // password 파라미터 유효성 검사
//     .notEmpty() // 1. 파라미터가 비어있으면 에러
//     .withMessage(`비밀번호값이 비어있습니다.`)
//     .isLength({ // 2. 파라미터의 길이가 4이상 25이하가 아니면 에러
//         min: 4,
//         max: 25
//     })
//     .withMessage(`비밀번호 길이가 4이상 25이하`)
//     .matches(/^.*[a-z].*$/)
//     .withMessage(`최소하나의 소문자 포함`)
//     .matches(/^.*[A-Z].*$/)
//     .withMessage(`최소 하나의 대문자 포함`)
// ],  memberCtrl.process.register);
router.post("/register", memberCtrl.process.register);
router.get("/login_form", memberCtrl.views.loginForm)
router.post("/login_check", memberCtrl.process.loginCheck)
router.get("/logout", memberCtrl.process.logout )


module.exports = router;