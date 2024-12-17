function reply_form(){
    // document.getElementById("modal_wrap").style.display = "block"
    // document.getElementById("first").style.display = "block"
    console.log($("#id").val());
    if($("#id").val()==""){
        alert("로그인 후 작성가능합니다")
        location.href = "/member/login_form"; 
        return
    }
    $("#first").slideDown('slow');
    $("#modal_wrap").show();
}

const reply_hide = () => {
    $("#first").hide();
    $("#modal_wrap").hide();
}

function rep(){
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
            init(form["write_no"])
        }else{
        alert("문제발생")
        }       
    })
}