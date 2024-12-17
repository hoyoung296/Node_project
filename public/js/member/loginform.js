const thema = "<%= thema %>"; //사용자 thema변수 저장
window.onload = () => {
    applyThema(thema); //사용자 thema 설정
};

// 비밀번호 보이기/숨기기 함수
function togglePassword() {
    const pwdField = document.getElementById("pwd");
    const toggleIcon = document.getElementById("toggle-icon");
    // 비밀번호 필드의 타입을 text <-> password로 변경
    if (pwdField.type === "password") {
        pwdField.type = "text";
        toggleIcon.src = "/static/front_image/eye_closed_icon.png"; // 아이콘 변경 (보여짐 상태)
    } else {
        pwdField.type = "password";
        toggleIcon.src = "/static/front_image/eye_open_icon.png"; // 아이콘 변경 (숨김 상태)
    }
}