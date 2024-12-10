const con = require("../db_common")
const daoRead = {
    list: async (start) => {
        sql = `select * from member order by ID desc offset ${start} rows fetch next 5 rows only`
        try {
            result = await (await con).execute(sql)
        } catch (err) {
            console.log(err)
        }
        return result
    },
    totalCnt: async () => {
        try {
            cnt = (await con).execute(`select count(*) from member`)
        } catch (err) {
            console.log(err)
        }
        return cnt
    },
    alram: async (start) => {
        sql = `select * from alram order by num desc offset ${start} rows fetch next 5 rows only`
        try {
            result = await (await con).execute(sql)
        } catch (err) {
            console.log(err)
        }
        return result
    },
    totalCnt1: async () => {
        try {
            cnt = (await con).execute(`select count(*) from alram`)
        } catch (err) {
            console.log(err)
        }
        return cnt
    },
    view: async (body) => {
        sql = `select * from alram where num=${body}`
        try {
            result = await (await con).execute(sql)
        } catch (err) {
            console.log(err)
        }
        return result
    },
    friendsview: async (start, username) => {
        sql = `select * from friends where member_id='${username}' or friend_id='${username}' order by member_id desc offset ${start} rows fetch next 5 rows only`
        try {
            result = await (await con).execute(sql)
        } catch (err) {
            console.log(err)
        }
        return result
    },
    totalCnt2: async () => {
        try {
            cnt = (await con).execute(`select count(*) from friends`)
        } catch (err) {
            console.log(err)
        }
        return cnt
    },
    check1: async (body) => {
        sql = `select * from friends where member_id='${body}'`
        try {
            result = await (await con).execute(sql)
        } catch (err) {
            console.log(err)
        }
        return result
    },
    check2: async (body) => {
        sql = `select * from friends where friend_id='${body}'`
        try {
            result = await (await con).execute(sql)
        } catch (err) {
            console.log(err)
        }
        return result
    }
}
const daoInsert = {
    insert: async (body) => {
        sql = `insert into alram(num, sender, receiver, object, subject, content) values(alram_seq.nextval, :sender, :receiver, :object, :subject, :content)`
        try {
            await (await con).execute(sql, body)
        } catch (err) {
            console.log(err)
        }
    },
    update: async (body) => {
        let { mem_id, fr_id } = body
        console.log("{mem_id, fr_id} : ", { mem_id, fr_id })
        if (mem_id > fr_id) {
            [mem_id, fr_id] = [fr_id, mem_id]
        }
        sql = `insert into friends(member_id, friend_id) values(:mem_id, :fr_id)`
        let result=0
        try {
            (await con).execute(sql, { mem_id, fr_id })
        } catch (err) {
            console.log(err)
        }
        console.log("친구 result : " , result)
        return result
    },
    del: async (body) => {
        sql = `delete from alram where num=:NUM`
        try {
            (await con).execute(sql, body)
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = { daoRead, daoInsert }