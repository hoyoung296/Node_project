async function init( write_no ) {
    console.log("init write_no : ", write_no )
    const res = await fetch("/board_rep/" + write_no )
    const data = await res.json();
    let html = "";
    data.forEach( d => {
        html += `<div align="left"><b>아이디 : </b>${d.ID}님 /`;
        html += `<b>작성일 : </b>${d.SAVE_DATE}<BR>`;
        html += `<b>제목 : </b>${d.NAME}<BR>`;
        html += `<b>내용 : </b>${d.CONTENT}<HR></div>`;
    })
    const content = document.getElementById("content")
    content.innerHTML = html;
}