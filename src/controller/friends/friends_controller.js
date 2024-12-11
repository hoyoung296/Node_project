const ser = require("../../service/friends/friends_service")
const mctrl = require("../controller") //thema설정하려고 추가

const views = {
    list: async (req, res) => {
        const thema = await mctrl.userThema(req.session) //사용자 테마 설정
        let list = await ser.pageRead.check(req.session.uid)
        console.log("ctrl list1 : ", list.list1)
        console.log("ctrl list2 : ", list.list2)
        let data = await ser.pageRead.list(req.query.start)
        console.log("data result : ", data.result)
        const filter1 = data.result.filter(item =>
            !list.list1.some(entry => entry.FRIEND_ID == item.ID)
        );
        console.log("filter1 : ", filter1)

        const filter2 = filter1.filter(item =>
            !list.list2.some(entry => entry.MEMBER_ID == item.ID)
        );
        console.log("filter2 : ", filter2)

        res.render("friends/list", { result: filter2, page: data.page, start: data.start, username: req.session.uid, thema })
    },
    alram: async (req, res) => {
        const thema = await mctrl.userThema(req.session) //사용자 테마 설정
        let data = await ser.pageRead.alram(req.query.start)
        res.render("friends/alramList", { result: data.result, page: data.page, start: data.start, username: req.session.uid, thema })
    },
    view: async (req, res) => {
        const thema = await mctrl.userThema(req.session) //사용자 테마 설정
        let result = await ser.pageRead.view(req.query.num)
        res.render("friends/view", { result, username: req.session.uid, thema })
    },
    friendsview: async (req, res) => {
        const thema = await mctrl.userThema(req.session) //사용자 테마 설정
        let data = await ser.pageRead.friendsview(req.query.start, req.session.uid)
        console.log("friendsview data : ", data.result)
        res.render("friends/friendsView", { result: data.result, page: data.page, start: data.start, username: req.session.uid, thema })
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
    update: async (req, res) => {
        console.log("update : ", req.body)
        let msg = await ser.pageInsert.update(req.body)
        res.send(msg)
    },
    del: (req, res) => {
        console.log("delete : ", req.body)
        ser.pageInsert.del(req.body)
        res.redirect("/friends/alram")
    }
}

module.exports = { views, process }