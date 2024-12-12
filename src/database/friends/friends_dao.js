const con = require("../db_common")
const daoRead = {
    list: async (start, body) => {
        console.log("check1 : ", await daoRead.check1(body))
        console.log("check2 : ", await daoRead.check2(body))
        console.log("typeof check1 : ", typeof await daoRead.check1(body))
        console.log("typeof check2 : ", typeof await daoRead.check2(body))
        const check1Result = await daoRead.check1(body);
        const check2Result = await daoRead.check2(body);

        console.log("First entry of check1:", check1Result[0]);
        console.log("First entry of check2:", check2Result[0]);
        console.log("check1.length : ", check1Result.length);
        console.log("check2.length : ", check2Result.length);

        let msg1 = '', msg2 = ''
        for (let i = 0; i < check1Result.length; i++) {
            if (check1Result.length == 1) {
                msg1 += `id!='${check1Result[i].FRIEND_ID}'`
                break;
            }

            if (i == check1Result.length - 1) {
                msg1 += `id!='${check1Result[i].FRIEND_ID}'`
                break;
            }

            msg1 += `id!='${check1Result[i].FRIEND_ID}' and `
        }

        for (let i = 0; i < check2Result.length; i++) {
            if (check2Result.length == 1) {
                msg2 += `id!='${check2Result[i].MEMBER_ID}'`
                break;
            }

            if (i == check2Result.length - 1) {
                msg2 += `id!='${check2Result[i].MEMBER_ID}'`
                break;
            }

            msg2 += `id!='${check2Result[i].MEMBER_ID}' and `
        }

        console.log("msg1 : ", msg1)
        console.log("msg2 : ", msg2)
        if (check1Result.length == 0 && check2Result.length == 0) {
            sql = `select * from (select * from member where id!='${body}' and id!='admin' order by ID desc) offset ${start} rows fetch next 5 rows only`
        }
        else if (check1Result.length == 0) {
            sql = `select * from (select * from member where ${msg2} and id!='${body}' and id!='admin' order by ID desc) offset ${start} rows fetch next 5 rows only`
        }
        else if (check2Result.length == 0) {
            sql = `select * from (select * from member where ${msg1} and id!='${body}' and id!='admin' order by ID desc) offset ${start} rows fetch next 5 rows only`
        }
        else {
            sql = `select * from (select * from member where ${msg1} and ${msg2} and id!='${body}' and id!='admin' order by ID desc) offset ${start} rows fetch next 5 rows only`
        }
        console.log("sql : ", sql)
        try {
            result = await (await con).execute(sql)
        } catch (err) {
            console.log(err)
        }
        return result
    },
    totalCnt: async (body) => {
        console.log("check1 : ", await daoRead.check1(body))
        console.log("check2 : ", await daoRead.check2(body))
        const check1Result = await daoRead.check1(body);
        const check2Result = await daoRead.check2(body);

        console.log("First entry of check1:", check1Result[0]);
        console.log("First entry of check2:", check2Result[0]);
        console.log("check1.length : ", check1Result.length);
        console.log("check2.length : ", check2Result.length);

        let msg1 = '', msg2 = ''
        for (let i = 0; i < check1Result.length; i++) {
            if (check1Result.length == 1) {
                msg1 += `id!='${check1Result[i].FRIEND_ID}'`
                break;
            }

            if (i == check1Result.length - 1) {
                msg1 += `id!='${check1Result[i].FRIEND_ID}'`
                break;
            }

            msg1 += `id!='${check1Result[i].FRIEND_ID}' and `
        }

        for (let i = 0; i < check2Result.length; i++) {
            if (check2Result.length == 1) {
                msg2 += `id!='${check2Result[i].MEMBER_ID}'`
                break;
            }

            if (i == check2Result.length - 1) {
                msg2 += `id!='${check2Result[i].MEMBER_ID}'`
                break;
            }

            msg2 += `id!='${check2Result[i].MEMBER_ID}' and `
        }

        console.log("msg1 : ", msg1)
        console.log("msg2 : ", msg2)
        if (check1Result.length == 0 && check2Result.length == 0) {
            sql = `select count(*) from (select * from member where id!='${body}' and id!='admin')`
        }
        else if (check1Result.length == 0) {
            sql = `select count(*) from (select * from member where ${msg2} and id!='${body}' and id!='admin')`
        }
        else if (check2Result.length == 0) {
            sql = `select count(*) from (select * from member where ${msg1} and id!='${body}' and id!='admin')`
        }
        else {
            sql = `select count(*) from (select * from member where ${msg1} and ${msg2} and id!='${body}')`
        }
        console.log("sql : ", sql)
        try {
            cnt = await (await con).execute(sql)
        } catch (err) {
            console.log(err)
        }
        console.log("cnt : ", cnt)
        return cnt
    },
    alram: async (start, body) => {
        sql = `select * from (select * from alram where sender='${body}' or receiver='${body}' order by num desc) offset ${start} rows fetch next 5 rows only`
        try {
            result = await (await con).execute(sql)
        } catch (err) {
            console.log(err)
        }
        console.log("")
        return result
    },
    totalCnt1: async (body) => {
        sql = `select count(*) from (select * from alram where sender='${body}' or receiver='${body}' order by num desc)`
        try {
            cnt = (await con).execute(sql)
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
    friendsview: async (start, body) => {
        sql = `select * from (select * from friends where member_id='${body}' or friend_id='${body}' order by member_id desc) offset ${start} rows fetch next 5 rows only`
        try {
            result = await (await con).execute(sql)
        } catch (err) {
            console.log(err)
        }
        return result
    },
    totalCnt2: async (body) => {
        sql = `select count(*) from (select * from friends where member_id='${body}' or friend_id='${body}' order by member_id desc)`
        try{
            cnt = (await con).execute(sql)
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
        return result.rows
    },
    check2: async (body) => {
        sql = `select * from friends where friend_id='${body}'`
        try {
            result = await (await con).execute(sql)
        } catch (err) {
            console.log(err)
        }
        return result.rows
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
        let result = 0
        try {
            result = await (await con).execute(sql, { mem_id, fr_id })
        } catch (err) {
            console.log(err)
        }
        console.log("친구 result : ", result)
        return result
    },
    del: async (body) => {
        sql = `delete from alram where num=:NUM`
        try {
            (await con).execute(sql, body)
        } catch (err) {
            console.log(err)
        }
    },
    friendsdel: async (body, username) => {
        sql = `delete from friends where (member_id='${body}' and friend_id='${username}') or (member_id='${username}'
         and friend_id='${body}')`
        try {
            (await con).execute(sql)
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = { daoRead, daoInsert }