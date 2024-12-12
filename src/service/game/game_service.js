const dao = require("../../database/game/game_dao")
const pageRead = {
    check: (body1,body2) => {
        let msg, url
        if (!body1) {
            msg = `로그인 이후 사용가능합니다!!!!`
            url = '/member/login_form'
        } else {
            msg = `${body2}님 환영합니다!!!!`
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
        await dao.daoUpdate.update(body)
    }
}
module.exports = { pageRead, pageUpdate }