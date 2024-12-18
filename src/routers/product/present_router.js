const router = require("express").Router()
const ctrl = require("../../controller/product/present_controller")

router.get("/", ctrl.presentForm)
router.post("/check", ctrl.check)
// router.get("/send", ctrl.send)

module.exports = router