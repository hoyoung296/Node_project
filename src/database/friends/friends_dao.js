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
    friendsview : async (start,username) => {
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
        sql = `insert into friends(member_id, friend_id) values(:mem_id, :fr_id)`
        try {
            (await con).execute(sql, body)
        } catch (err) {
            console.log(err)
        }
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