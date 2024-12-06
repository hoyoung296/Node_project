const con = require("../db_common")
const daoRead = {
    list: async () => {
        sql = `select * from member`
        try {
            result = await (await con).execute(sql)
        } catch (err) {
            console.log(err)
        }
        console.log("result : ", result)
        return result
    }
}
const daoInsert = {
    insert: async (body) => {

    }
}

module.exports = { daoRead, daoInsert }