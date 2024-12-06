const dao = require("../../database/friends/friends_dao")
const pageRead = {
    list: async () => {
        let result = await dao.daoRead.list()
        console.log("ser list : ", result)
        return result.rows
    }
}
const pageInsert = {
    insert: async (body) => {
        await dao.daoInsert.insert(body)
    }
}

module.exports = { pageRead, pageInsert }