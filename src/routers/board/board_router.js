const router = require("express").Router();

const ctrl = require("../../controller/board/board_ctrl")

const upload = require("../../../config/file/file_config")


router.get("/list", ctrl.views.list)
router.get("/write_form", ctrl.views.writeForm)
router.get("/data/:num", ctrl.views.data)
router.get("/modify_form/:writeNo", ctrl.views.modifyForm);
router.post("/write", upload.single("image_file_name"), ctrl.process.write);
router.get("/delete/:writeNo/:imgName", ctrl.process.delete);
router.post("/modify", upload.single('image_file_name'), ctrl.process.modify);
router.get("/main", ctrl.views.main);
router.get("/download/:imgName", ctrl.file_process.download );
router.get("/topic",ctrl.views.topic);
router.get("/:category",ctrl.views.category);

module.exports = router;