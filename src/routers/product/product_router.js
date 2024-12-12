const router = require("express").Router()
const ctrl = require("../../controller/product/product_controller")

router.get("/", ctrl.list)
router.get("/load", ctrl.load)
router.get("/purchase", ctrl.purchase)
router.get("/saveThema", ctrl.saveThema)

module.exports = router