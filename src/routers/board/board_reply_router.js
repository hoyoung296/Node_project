const router = require("express").Router();

const ctrl = require("../../controller/board/board_reply_ctrl")
router.post("/", ctrl.process.register)
router.get("/:writeno", ctrl.views.data )
router.delete("/delete/:reply_no", ctrl.process.delete);

module.exports = router