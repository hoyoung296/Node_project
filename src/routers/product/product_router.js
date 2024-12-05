const router = require("express").Router()
const ctrl = require("../../controller/product/product_controller")

router.get("/", ctrl.list)
router.get("/load", ctrl.load)

module.exports = router