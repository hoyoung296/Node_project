const getMessage = (msg, url) => {
    return `<script>
        alert('${msg}');
        location.href = '${url}';
    </script>`;
}
const timeModify = ( list ) => {
    list = list.map( data => {
        data['SAVE_DATE'] = data['SAVE_DATE'].toLocaleString();
        return data;
    })
    return list;
}
const sessionCheck = ( session ) => {
    if( session == undefined || session.username == undefined ){
        msg = `로그인 사용자만 가능합니다`
        url = '/member/login_form'
        return getMessage(msg, url)

    }
    return 0;
}
module.exports = {sessionCheck, timeModify, getMessage }