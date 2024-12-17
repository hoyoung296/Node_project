const router = require("express").Router()
const ctrl = require("../../controller/product/present_controller")

router.get("/", ctrl.presentForm)

module.exports = router