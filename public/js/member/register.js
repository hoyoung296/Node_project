 // 아이디 중복 체크 함수
 function checkIdAvailability() {
    const id = document.getElementById("id").value;
    const idError = document.getElementById("idError");

    // 아이디에 한글과 특수기호가 포함되지 않도록 하는 정규식
    const idRegex = /^[a-zA-Z0-9]+$/;  // 영어와 숫자만 허용

    // 아이디 입력이 비어있지 않으면 유효성 검사 시작
    if (id) {
        if (!idRegex.test(id)) {
            idError.innerHTML = "아이디는 영어와 숫자만 사용할 수 있습니다.";
            idError.style.color = "red";
        } else {
            fetch(`/member/check-id?uid=${id}`)  // 서버의 아이디 중복 체크 API로 요청
                .then(response => response.json())
                .then(data => {
                    if (data.isAvailable) {
                        idError.innerHTML = "사용 가능한 아이디입니다.";
                        idError.style.color = "green";  // 중복이 아니면 초록색
                    } else {
                        idError.innerHTML = "이미 사용 중인 아이디입니다.";
                        idError.style.color = "red";  // 중복이 있으면 빨간색
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    idError.innerHTML = "서버 오류가 발생했습니다.";
                    idError.style.color = "red";
                });
        }
    } else {
        idError.innerHTML = "아이디를 입력해주세요.";
        idError.style.color = "red";
    }
}

function checkPwdAvailability(){
    const password = document.getElementById("pwd").value;
    // 비밀번호 길이 검사
    // 비밀번호 유효성 검사 (대문자, 소문자, 숫자, 특수문자 포함)
    const passwordRegex = /^(?=[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (password.length < 8) {
        document.getElementById("passwordError").innerHTML = "비밀번호는 8자 이상이어야 합니다.";
    } else {
        if (!passwordRegex.test(password)) {
            document.getElementById("passwordError").innerHTML = "비밀번호는 처음 대문자를 시작하고, 소문자, 숫자, 특수문자를 포함해야 합니다.";
        } else {
            document.getElementById("passwordError").innerHTML = "";
        }
    }
}

function checkPwd2Availability(){
    const password = document.getElementById("pwd").value;
    const confirmPassword = document.getElementById("pwd2").value;  // 비밀번호 확인
    // 비밀번호 확인 검사
    if (password !== confirmPassword) {
        document.getElementById("confirmPasswordError").innerHTML = "비밀번호가 일치하지 않습니다.";
    } else {
        document.getElementById("confirmPasswordError").innerHTML = "";
    }
}

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

async function checkEmailAvailability() {
    const email = document.getElementById("email").value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailError = document.getElementById("emailError");
    if (!emailRegex.test(email)) {
        emailError.innerHTML = "올바른 이메일 주소를 입력하세요.";
        emailError.style.color = "red";  // 빨간색으로 오류 표시
    } else {
        try {
            const response = await fetch('/member/check-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email })  // 이메일을 JSON 형식으로 요청 본문에 포함
            });
        
            const data = await response.json();  // 응답을 JSON으로 파싱
        
            if (!data.isAvailable) {
                emailError.innerHTML = "사용 가능한 이메일입니다.";
                emailError.style.color = "green";  // 중복이 아니면 초록색
            } else {
                emailError.innerHTML = "이미 사용 중인 이메일입니다.";
                emailError.style.color = "red";  // 중복이 있으면 빨간색
            }
        } catch (error) {
            console.error('Error:', error);
            emailError.innerHTML = "서버 오류가 발생했습니다.";
            emailError.style.color = "red";
        }
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

function validateForm() {
    const name = document.getElementById("name").value;
    const id = document.getElementById("id").value;
    const password = document.getElementById("pwd").value;
    const confirmPassword = document.getElementById("pwd2").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const addr = document.getElementById("addr").value;  // 주소 값 추가


    // 각 필드가 비어 있는지 확인
    if (id == "" || password == "" || name == "" || email == "" || phone == "" || addr == "") {
        alert("모든 필드는 필수입니다.");
        return false;  // 모든 필드가 입력되지 않으면 폼 제출을 막음
    }

    // 아이디 유효성 검사
    checkIdAvailability();
    if (document.getElementById("idError").style.color !== "green") {
        alert("아이디 입력을 올바르게 해주세요.");
        return false;
    }

    // 비밀번호 유효성 검사
    checkPwdAvailability();
    if (document.getElementById("passwordError").innerHTML !== "") {
        alert("비밀번호입력을 올바르게 해주세요.");
        return false;  // 비밀번호 오류가 있으면 제출을 막음
    }

    // 비밀번호 확인 유효성 검사
    checkPwd2Availability();
    if (document.getElementById("confirmPasswordError").innerHTML !== "") {
        alert("비밀번호재확인입력을 올바르게 해주세요..");
        return false;  // 비밀번호 확인 오류가 있으면 제출을 막음
    }

    // 전화번호 유효성 검사
    checkPhoneAvailability();
    if (document.getElementById("phoneError").innerHTML !== "") {
        alert("폰 번호 입력을 올바르게 해주세요..");
        return false;  // 전화번호 오류가 있으면 제출을 막음
    }

    // 이메일 유효성 검사
    checkEmailAvailability();
    if (document.getElementById("emailError").style.color !== "green") {
        alert("이메일 입력을 올바르게 해주세요..");
        return false;  // 이메일 오류가 있으면 제출을 막음
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

    return true;  // 모든 검사를 통과하면 폼 제출
}