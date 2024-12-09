const router = require("express").Router();
const multer = require("multer");
const path = require("path")
const ejs = require('ejs');
const ctrl = require("../../controller/board/board_ctrl")


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // 파일이 저장될 폴더 설정
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        // 파일 이름 설정: 원본 파일명 + 확장자
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// multer 미들웨어 설정
const upload = multer({ storage: storage });


router.get("/list", ctrl.views.list)
router.get("/write_form", ctrl.views.writeForm)
router.get("/data/:num", ctrl.views.data)
router.get("/modify_form/:writeNo", ctrl.views.modifyForm);
router.post("/write", upload.single("image_file_name"), ctrl.process.write);
router.get("/delete/:writeNo/:imgName", ctrl.process.delete);

router.get("/main", ctrl.views.main);


module.exports = router;