function checkPhoneAvailability() {
    const phone = document.getElementById("phone").value;  // 사용자가 입력한 전화번호
    const phoneError = document.getElementById("phoneError");  // 오류 메시지를 표시할 요소

    // 전화번호가 010으로 시작하는지 확인하고, 그 뒤에 8자리 또는 9자리 숫자가 있는지 확인
    if (phone.startsWith("010")) {
        if (phone.length !== 11) {  // 010으로 시작하는 전화번호는 11자리여야 함
            phoneError.innerHTML = "길이가 맞지 않습니다.";  // 길이가 맞지 않으면 오류 메시지
        } else {
            phoneError.innerHTML = "";  // 길이가 맞으면 오류 메시지 제거
        }
    } else {
        phoneError.innerHTML = "010부터 시작하는 폰번호를 입력하세요.";  // 010으로 시작하지 않으면 오류 메시지 제거
    }
}

function checkAddrAvailability() {
    const addr = document.getElementById("addr").value;
    const addrError = document.getElementById("addrError");
    
    if (!addr) {  // 주소가 비어 있으면
        addrError.innerHTML = "주소를 입력해주세요.";  // 오류 메시지 출력
        addrError.style.color = "red";  // 빨간색으로 오류 표시
    } else {
        addrError.innerHTML = "";  // 주소가 입력되었으면 오류 메시지 삭제
    }
}

function checkNameAvailability() {
    const name = document.getElementById("name").value;
    const nameError = document.getElementById("nameError");
    if (!name) {
        nameError.innerHTML = "이름을 입력해주세요.";
        nameError.style.color = "red";
    } else {
        nameError.innerHTML = "";
    }
}

function checkDotoriAvailability() {
    const dotori = document.getElementById("dotori").value;
    const dotoriError = document.getElementById("dotoriError");
    if (!dotori) {
        dotoriError.innerHTML = "도토리수를 입력해주세요.";
        dotoriError.style.color = "red";
    } else {
        dotoriError.innerHTML = "";
    }
}

function checkLoginfailAvailability() {
    const loginfail = document.getElementById("loginfail").value;
    const loginfailError = document.getElementById("loginfailError");
    if (!loginfail) {
        loginfailError.innerHTML = "로그인 실패 수를 입력해주세요.";
        loginfailError.style.color = "red";
    } else {
        loginfailError.innerHTML = "";
    }
}

function validateForm() {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const addr = document.getElementById("addr").value;  // 주소 값 추가
    const dotori = document.getElementById("dotori").value;
    const loginfail = document.getElementById("loginfail").value;


    // 각 필드가 비어 있는지 확인
    if (id == "" || name == "" || phone == "" || addr == "" || dotori == "" || loginfail == "") {
        alert("모든 필드는 필수입니다.");
        return false;  // 모든 필드가 입력되지 않으면 폼 제출을 막음
    }
    // 전화번호 유효성 검사
    checkPhoneAvailability();
    if (document.getElementById("phoneError").innerHTML !== "") {
        alert("폰 번호 입력을 올바르게 해주세요..");
        return false;  // 전화번호 오류가 있으면 제출을 막음
    }

    // 이름 유효성 검사
    checkNameAvailability();
    if (document.getElementById("nameError").innerHTML !== "") {
        alert("이름입력을 올바르게 해주세요..");
        return false;  // 이름 오류가 있으면 제출을 막음
    }

    // 주소 유효성 검사
    checkAddrAvailability();
    if (document.getElementById("addrError").innerHTML !== "") {
        alert("주소 입력을 올바르게 해주세요..");
        return false;  // 주소 오류가 있으면 제출을 막음
    }

    // 주소 유효성 검사
    checkDotoriAvailability();
    if (document.getElementById("dotoriError").innerHTML !== "") {
        alert("도토리 수 입력을 올바르게 해주세요..");
        return false;  // 주소 오류가 있으면 제출을 막음
    }

     // 주소 유효성 검사
     checkLoginfailAvailability();
     if (document.getElementById("loginfailError").innerHTML !== "") {
         alert("로그인 실패 수 입력을 올바르게 해주세요..");
         return false;  // 주소 오류가 있으면 제출을 막음
     }

    return true;  // 모든 검사를 통과하면 폼 제출
}