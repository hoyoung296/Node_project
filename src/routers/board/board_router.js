const router = require("express").Router();

const ctrl = require("../../controller/board/board_ctrl")

router.get("/list", ctrl.views.list)
router.get("/write_form", ctrl.views.writeForm)


module.exports = router;