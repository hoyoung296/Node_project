const dao = require("../../database/friends/friends_dao")
const pageRead = {
    list: async (start, body) => {
        if (!start)
            start = 1
        start = Number(start)
        const totalCnt = await dao.daoRead.totalCnt(body)
        const num = totalCnt.rows[0]['COUNT(*)']
        const number = (num % 5 == 0) ? 0 : 1
        const page = parseInt(num / 5 + number)
        startNum = (start - 1) * 5
        let result = await dao.daoRead.list(startNum, body)
        return { result: result.rows, page, start }
    },
    alram: async (start, body) => {
        if (!start)
            start = 1
        start = Number(start)
        const totalCnt = await dao.daoRead.totalCnt1(body)
        const num = totalCnt.rows[0]['COUNT(*)']
        const number = (num % 5 == 0) ? 0 : 1
        const page = parseInt(num / 5 + number)
        startNum = (start - 1) * 5
        let result = await dao.daoRead.alram(startNum, body)
        result = pageRead.timeModify(result.rows)
        return { result, page, start }
    },
    timeModify: (list) => {
        list = list.map(data => {
            data['SAVE_DATE'] = data['SAVE_DATE'].toLocaleString()
            return data
        })
        return list
    },
    view: async (body) => {
        let result = await dao.daoRead.view(body)
        result = pageRead.timeModify(result.rows)
        return result
    },
    friendsview: async (start, username) => {
        if (!start)
            start = 1
        start = Number(start)
        const totalCnt = await dao.daoRead.totalCnt2(username)
        const num = totalCnt.rows[0]['COUNT(*)']
        const number = (num % 5 == 0) ? 0 : 1
        const page = parseInt(num / 5 + number)
        startNum = (start - 1) * 5
        let result = await dao.daoRead.friendsview(startNum, username)
        return { result: result.rows, page, start }
    }
}
const pageInsert = {
    insert: async (body) => {
        await dao.daoInsert.insert(body)
    },
    update: async (body) => {
        let result = await dao.daoInsert.update(body)
        console.log("친구 ser result : ", result)
        let msg = ""
        if (result != 0) {
            msg = "친구추가 되었습니다."
        }
        else {
            msg = "이미 친구인 회원입니다."
        }
        let url = "/friends/alram"
        return pageInsert.getMessage(msg, url)
    },
    getMessage: (msg, url) => {
        return `<script>
        alert("${msg}")
        location.href="${url}"
</script>`
    },
    del: (body) => {
        dao.daoInsert.del(body)
    },
    friendsdel: (body, username) => {
        dao.daoInsert.friendsdel(body, username)
    }
}

module.exports = { pageRead, pageInsert }