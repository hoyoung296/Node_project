function reply_form(){
    // document.getElementById("modal_wrap").style.display = "block"
    // document.getElementById("first").style.display = "block"
    console.log($("#id").val());
    if($("#id").val()==""){
        alert("로그인 후 작성가능합니다")
        return location.href("/member/loginForm")
    }
    $("#first").slideDown('slow');
    $("#modal_wrap").show();
}

const reply_hide = () => {
    $("#first").hide();
    $("#modal_wrap").hide();
}

function rep(no){
    
    console.log("req  실행")
    let form = {}
    let arr = $("#frm").serializeArray();
    console.log(arr)
    arr.forEach(d => {form[d.name] = d.value})
    console.log(form)

    fetch("/board_rep",{
        method : "post",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify(form)
    })
    .then(res => res.json())
    .then(result => {
        if(result==1){
            alert("답글 성공")
            reply_hide();
            location.href = '/board/data/' + no
            // init(form["write_no"])
            // const html = `
            //     <div class="first">
            //         <p class="first-user">아이디: ${form["id"]}</p>
            //         <p class="first-date">작성일: ${new Date().toLocaleString()}</p>
            //         <p class="first-content">내용: ${form["content"]}</p>
            //     </div>
            // `;
            // const content = document.getElementById("content"); // 댓글이 추가될 부모 요소
            // content.insertAdjacentHTML("beforeend", html); // 새로운 댓글 추가
        }else{
        alert("문제발생")
        }       
    })
}