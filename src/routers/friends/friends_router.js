const router = require("express").Router()
const ctrl = require("../../controller/friends/friends_controller")

router.get("/", ctrl.views.list)
router.post("/check", ctrl.process.check)
router.post("/insert", ctrl.process.insert)
router.get("/alram", ctrl.views.alram)
router.get("/view", ctrl.views.view)
router.post("/update", ctrl.process.update)
router.post("/del", ctrl.process.del)
router.get("/friendsview", ctrl.views.friendsview)
router.post("/friendsdel", ctrl.process.friendsdel)
router.get("/download", ctrl.views.download)

module.exports = router