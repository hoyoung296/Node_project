const getMessage = (msg, url) => {
    return `<script>
        alert("${msg}")
        location.href = "${url}"
    </script>`;
}
const dayModify = ( list ) => {
    list = list.map( data => {
        data['SAVE_DATE'] = data['SAVE_DATE'].toLocaleString([], {year: 'numeric', month: '2-digit', day: '2-digit' });
        return data;
    })
    return list;
}
const timeModify = ( list ) => {
    list = list.map( data => {
        data['SAVE_DATE'] = data['SAVE_DATE'].toLocaleString([], {year: 'numeric', month: '2-digit', day: '2-digit' }) +" "+data['SAVE_DATE'].toLocaleTimeString([], { hour: '2-digit', minute: '2-digit',hour12: false});
        return data;
    })
    return list;
}
const sessionCheck = ( session ) => {
    if( session.uid == undefined || session.name == undefined ){
        msg = `로그인 사용자만 가능합니다`
        url = '/member/login_form'
        return getMessage(msg, url)

    }
    return 0;
}
module.exports = {sessionCheck, timeModify, getMessage, dayModify }