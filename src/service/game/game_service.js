const dao = require("../../database/game/game_dao")
const pageRead = {
    check: (body) => {
        let msg, url
        if (!body) {
            msg = `로그인 이후 사용가능합니다!!!!`
            url = '/로그인 사이트 경로'
        } else {
            msg = `${body}님 환영합니다!!!!`
            url = '/game/index'
        }
        return pageRead.getMessage(msg, url)
    },
    getMessage: (msg, url) => {
        return `<script>
                alert("${msg}")
                location.href="${url}"
                </script>`
    }
}
const pageUpdate = {
    update: async (body) => {
        await dao.daoInsert.update(body)
    }
}
module.exports = { pageRead, pageUpdate }