// 필요한 라이브러리 불러오기
const nodemailer = require('nodemailer');
const dao = require("../../database/member/member_dao")
const bcrypt = require("bcrypt");

// 비밀번호 생성에 사용할 문자 배열 정의
var lowerCase = "abcdefghijklmnopqrstuvwxyz".split("");  // 소문자
var upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");  // 대문자
var digits = "0123456789".split("");  // 숫자
var specialChars = "!@".split("");  // 특수기호

// 비밀번호 배열 섞기 (첫번째 자리 제외하고 섞기)
const shufflePassword = (password) => {
    // 첫 번째 자리를 제외한 나머지 부분
    let passwordWithoutFirst = password.slice(1);

    // 나머지 부분을 섞기
    for (let i = passwordWithoutFirst.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [passwordWithoutFirst[i], passwordWithoutFirst[j]] = [passwordWithoutFirst[j], passwordWithoutFirst[i]];  // 배열 섞기
    }

    // 첫 번째 자리를 앞에 다시 추가하여 반환
    return [password[0], ...passwordWithoutFirst];
}

// 랜덤한 비밀번호 생성 함수
const createRandomPassword = (length) => {
    var password = [];  // 비밀번호를 저장할 배열

    // 첫 번째 문자는 대문자
    password.push(upperCase[Math.floor(Math.random() * upperCase.length)]);

    // 소문자, 숫자, 특수기호 하나씩 반드시 포함
    password.push(lowerCase[Math.floor(Math.random() * lowerCase.length)]);
    password.push(digits[Math.floor(Math.random() * digits.length)]);
    password.push(specialChars[Math.floor(Math.random() * specialChars.length)]);

    // 나머지 자리는 랜덤하게 소문자, 숫자, 특수기호 포함
    for (var i = 4; i < length; i++) {
        var allChars = lowerCase.concat(upperCase, digits, specialChars);  // 모든 문자셋을 합침
        password.push(allChars[Math.floor(Math.random() * allChars.length)]);  // 랜덤한 문자 선택
    }

    // 첫 번째 자리를 제외하고 나머지 배열을 섞기
    password = shufflePassword(password);

    // 생성된 배열을 문자열로 결합하여 반환
    return password.join('');
}

// 이메일 전송 함수
const sendTemporaryPassword = async (email,uid) => {
    var randomPassword = createRandomPassword(8);  // 8자리 임시 비밀번호 생성

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: true,
        auth: {
            user: '412jsh@gmail.com',
            pass: 'xdne nwqt figz awqq',
        },
    });

    // 이메일 옵션 설정
    const emailOptions = {
        from: '412jsh@gmail.com',      // 보내는 사람 이메일
        to: email,                         // 받는 사람 이메일
        subject: 'dotori에서 임시 비밀번호를 알려드립니다.', // 이메일 제목
        html: ` 
            <h1>dotori에서 새로운 비밀번호를 알려드립니다.</h1>
            <h2>비밀번호: ${randomPassword}</h2>
            <h3 style="color: crimson;">임시 비밀번호로 로그인 하신 후, 반드시 비밀번호를 수정해 주세요.</h3>
        `, // 이메일 본문 내용 (HTML 형식)
    };

    try {
        console.log("임시비밀번호 : ",randomPassword)
        console.log("uid : ",email)
        console.log("email : ",uid)
        const pwd = await bcrypt.hash(randomPassword, 10);
        const rs = await dao.process.dao_chagePwd(email,uid,pwd)
        console.log("emailsend의 rs : ",rs.rowsAffected)
        // 이메일 전송
        if(rs.rowsAffected == 1){
            let info = await transporter.sendMail(emailOptions);
            console.log('Email sent: ' + info.response);  // 전송된 이메일의 응답 출력
            return randomPassword;  // 임시 비밀번호 반환
        }else{
            return null;  // 비밀번호 변경 실패시
        }
        
    } catch (error) {
        console.log("Error occurred: ", error);  // 오류 발생 시 오류 메시지 출력
        return null;  // 오류 발생 시 null 반환
    }
}

module.exports = { sendTemporaryPassword };
