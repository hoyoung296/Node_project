const ser = require("../../service/friends/friends_service")
const views = {
    list: async (req, res) => {
        let data = await ser.pageRead.list(req.query.start)
        res.render("friends/list", { result: data.result, page: data.page, start: data.start, username: req.session.uid })
    },
    alram: async (req, res) => {
        let data = await ser.pageRead.alram(req.query.start)
        res.render("friends/alramList", { result: data.result, page: data.page, start: data.start, username: req.session.uid })
    },
    view: async (req, res) => {
        let result = await ser.pageRead.view(req.query.num)
        res.render("friends/view",{ result , username: req.session.uid })
    },
    friendsview : async (req,res) => {
        let data = await ser.pageRead.friendsview(req.query.start, req.session.uid)
        console.log("friendsview data : " , data)
        res.render("friends/friendsView",{ result: data.result, page: data.page, start: data.start, username: req.session.uid })
    }
}
const process = {
    check: (req, res) => {
        res.render("friends/insert_form", { username: req.session.uid, body: req.body })
    },
    insert: async (req, res) => {
        await ser.pageInsert.insert(req.body)
        res.send(`<script>
                alert("메세지 전송 완료")
                location.href="/friends"
            </script>`)
    },
    update : (req,res) => {
        console.log("update : " , req.body)
        ser.pageInsert.update(req.body)
        res.redirect("/friends/alram")
    },
    del : (req,res) => {
        console.log("delete : " , req.body)
        ser.pageInsert.del(req.body)
        res.redirect("/friends/alram")
    }
}

module.exports = { views, process }