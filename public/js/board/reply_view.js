async function init(write_no) {
    console.log("init write_no : ", write_no)
    const res = await fetch("/board_rep/" + write_no)
    const data = await res.json();
    // console.log(data)
    let html = "";
    data.forEach(d => {

        html += `<div id="board_reply"><b id="reply_id">${d.ID}</b><BR>`;
        html += `<b id="reply_content">${d.CONTENT}</b><BR>`;
        html += `<b id="reply_date">${d.SAVE_DATE}</b>
        
                <button onclick="deleteReply(${d.REPLY_NO})">삭제</button>
                </div>`;
    })
    const content = document.getElementById("content")
    content.innerHTML = html;
}