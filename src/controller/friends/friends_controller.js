const ser = require("../../service/friends/friends_service")
const views = {
    list : async (req, res) => {
        let result = await ser.pageRead.list()
        console.log("ctrl list : ", result)
        console.log("req.session.uid", req.session.uid)
        res.render("friends/list", { result, username: req.session.uid })
    }
}
const process = {
    insert : async (req, res) => {
        console.log("req.body : ", req.body)
        await ser.pageInsert.insert(req.body)
        res.render("friends/insert")
    }
}

module.exports = { views, process }