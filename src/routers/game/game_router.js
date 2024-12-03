const router = require("express").Router()
const ctrl = require("../../controller/game/game_controller")

router.get("/", ctrl.views.check)
router.get("/index", ctrl.views.index)
router.get("/info", ctrl.views.info)
router.get("/play", ctrl.views.play)
router.post("/update", ctrl.process.update)

module.exports = router