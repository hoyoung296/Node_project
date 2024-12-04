const con = require("../db_common")
const daoUpdate = {
    update: async (body) => {
        const sql = `update member set DOTORI=DOTORI + ${body.result} where ID='${body.id}'`
        try {
            (await con).execute(sql)
        } catch (err) {
            console.log(err)
        }
    }
}
module.exports = { daoUpdate }