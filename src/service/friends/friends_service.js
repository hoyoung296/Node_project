const dao = require("../../database/friends/friends_dao")
const pageRead = {
    list: async (start) => {
        if (!start)
            start = 1
        start = Number(start)
        const totalCnt = await dao.daoRead.totalCnt()
        const num = totalCnt.rows[0]['COUNT(*)']
        const number = (num % 5 == 0) ? 0 : 1
        const page = parseInt(num / 5 + number)
        startNum = (start - 1) * 5
        let result = await dao.daoRead.list(startNum)
        return { result: result.rows, page, start }
    },
    alram: async (start) => {
        if (!start)
            start = 1
        start = Number(start)
        const totalCnt = await dao.daoRead.totalCnt1()
        const num = totalCnt.rows[0]['COUNT(*)']
        const number = (num % 5 == 0) ? 0 : 1
        const page = parseInt(num / 5 + number)
        startNum = (start - 1) * 5
        let result = await dao.daoRead.alram(startNum)
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
    view : async (body) => {
        let result = await dao.daoRead.view(body)
        result = pageRead.timeModify(result.rows)
        return result
    },
    friendsview: async (start,username) => {
        if (!start)
            start = 1
        start = Number(start)
        const totalCnt = await dao.daoRead.totalCnt2()
        const num = totalCnt.rows[0]['COUNT(*)']
        const number = (num % 5 == 0) ? 0 : 1
        const page = parseInt(num / 5 + number)
        startNum = (start - 1) * 5
        let result = await dao.daoRead.friendsview(startNum,username)
        return { result: result.rows, page, start }
    },
}
const pageInsert = {
    insert: async (body) => {
        await dao.daoInsert.insert(body)
    },
    update : (body) => {
        dao.daoInsert.update(body)
    },
    del : (body) => {
        dao.daoInsert.del(body)
    }
}

module.exports = { pageRead, pageInsert }