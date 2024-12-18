async function init(write_no) {
    console.log("init write_no : ", write_no)
    const res = await fetch("/board_rep/" + write_no)
    const data = await res.json();
    console.log("data : ", data)
    let html = "";
    data.result.forEach(d => {
        html += `<div id="board_reply_${d.REPLY_NO}" data-reply-id="${d.REPLY_NO}">
            <b id="reply_id">${d.ID}</b><br>
            <b id="reply_content">${d.CONTENT}</b><br>
            <b id="reply_date">${d.SAVE_DATE}</b>`;

        // 삭제 버튼을 조건부로 표시
        if ( data.uid === d.ID || data.uid === 'admin') {
            html += `<button onclick="deleteReply(${d.REPLY_NO})">삭제</button>`;
        }

        html += `</div>`;
    });
    document.getElementById("content").innerHTML = html;
}
async function deleteReply(reply_no) {
    try {
        const res = await fetch(`/board_rep/delete/${reply_no}`, {
            method: "DELETE"
        });

        const result = await res.json();
        if (result.success) {
            console.log("댓글 삭제 성공");
            document.querySelector(`[data-reply-id='${reply_no}']`).remove();
        } else {
            alert(result.message || "댓글 삭제 실패");
        }
    } catch (err) {
        console.error("댓글 삭제 중 오류: ", err);
        alert("댓글 삭제 중 오류가 발생했습니다.");
    }
}