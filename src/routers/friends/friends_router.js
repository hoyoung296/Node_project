const router = require("express").Router()
const ctrl = require("../../controller/friends/friends_controller")

router.get("/", ctrl.views.list)
router.post("/insert", ctrl.process.insert)

module.exports = router