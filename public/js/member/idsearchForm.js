let expiryTime;  // 만료 시간 변수
let timerInterval; // 타이머 인터벌

// 이메일 인증번호 발송
async function sendVerificationCode(event) {
    event.preventDefault();  // 폼 전송 방지

    const email = document.getElementById('email').value;
    const response = await fetch('/member/sendEmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
    });

    const data = await response.json();
    console.log("data : ",data)
    if (response.ok) {
        document.getElementById('message').textContent = data.message;
        document.getElementById('emailcheck').disabled = false;
        document.getElementById('verifyBtn').disabled = false;
        document.getElementById('resendBtn').style.display = 'inline-block';  // 재발송 버튼 보이기
        document.getElementById('sendEmailBtn').disabled = true;  // 이메일 인증하기 버튼 비활성화

        // 서버에서 받은 만료 시간을 로컬스토리지에 저장
        if (data.expirationTime && !isNaN(data.expirationTime)) {
            expiryTime = data.expirationTime;
            localStorage.setItem('verificationExpiry', expiryTime);  // 만료 시간을 로컬스토리지에 저장
            console.log("Expiration time saved:", expiryTime);  // 만료 시간 로그 확인
        } else {
            document.getElementById('message').textContent = '유효한 만료 시간이 전달되지 않았습니다.';
            return;
        }

        // 타이머 시작
        startTimer();  // 타이머 시작
    } else {
        document.getElementById('message').textContent = data.message;
    }
}


// 인증번호 확인
async function verifyCode(event) {
    event.preventDefault();  // 폼 전송 방지

    const emailCheck = document.getElementById('emailcheck').value;

    // 만료 시간 체크
    const expirationTime = localStorage.getItem('verificationExpiry');
    const currentTime = Date.now();

    // 만료 시간이 지나면 인증 실패 처리
    if (currentTime > expirationTime) {
        document.getElementById('message').textContent = '인증번호가 만료되었습니다. 다시 요청해주세요.';
        return;
    }

    const response = await fetch('/member/verifyEmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ emailcheck: emailCheck })
    });

    const data = await response.json();
    document.getElementById('message').textContent = data.message;

    if (data.success) {
        // 인증 성공 시 로그인 페이지로 이동
        window.location.href = `/member/idview?uid=${data.uid}`;
    } else {
        // 인증 실패 시 별도의 처리
        alert("인증 실패, 다시 시도해주세요.");
    }
}

// 인증번호 재발송
async function resendCode(event) {
    event.preventDefault();  // 폼 전송 방지

    const email = document.getElementById('email').value;
    const response = await fetch('/member/sendEmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
    });

    const data = await response.json();
    document.getElementById('message').textContent = data.message;

    if (response.ok) {
        // 재발송 시 새로운 만료 시간을 로컬스토리지에 저장
        expiryTime = data.expirationTime;  // 새로운 만료 시간 업데이트
        localStorage.setItem('verificationExpiry', expiryTime);  // 로컬스토리지에 새로운 만료 시간 저장
        startTimer();  // 타이머 다시 시작
    }
}

// 타이머 시작 함수
function startTimer() {
    const storedExpiryTime = localStorage.getItem('verificationExpiry');

    if (storedExpiryTime === null || isNaN(storedExpiryTime)) {
        document.getElementById('timer').textContent = '만료 시간이 설정되지 않았습니다.';
        return;
    }

    expiryTime = Number(storedExpiryTime);  // 문자열을 숫자형으로 변환

    // 타이머 인터벌 설정
    timerInterval = setInterval(updateTimer, 1000);
}

// 타이머 업데이트 함수
function updateTimer() {
    const currentTime = Date.now();
    const remainingTime = expiryTime - currentTime;

    // 만약 remainingTime이 음수일 경우, 만료 처리
    if (remainingTime < 0) {
        clearInterval(timerInterval);  // 타이머 종료
        document.getElementById('timer').textContent = '인증번호가 만료되었습니다.'; // 만료 메시지
        document.getElementById('verifyBtn').disabled = true;  // 인증번호 확인 버튼 비활성화
    } else {
        const minutes = Math.floor(remainingTime / 60000);  // 남은 분 계산
        const seconds = Math.floor((remainingTime % 60000) / 1000);  // 남은 초 계산

        // 남은 시간 표시
        document.getElementById('timer').textContent = `유효 시간: ${minutes < 10 ? '0' : ''}${minutes}분 ${seconds < 10 ? '0' : ''}${seconds}초`;
    }
}