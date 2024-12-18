// 캔버스 세팅
let canvas;
let ctx;
// html은 텍스트나 구조를 보여주는 데는 적합하나 이미지의 움직임을 보여주기엔 부적합 
// 그래서 html에서 제공하는 canvas태그 사용
// canvas태그 사용 시 중요한 원칙이 있는데 이미지의 왼쪽 상단 모서리의 좌표(x,y)가 이미지의 위치를 결정
canvas = document.createElement("canvas") // canvas를 만들어서 변수에 저장
ctx = canvas.getContext("2d") // 2d로 그림을 그려줌
// 캔버스 사이즈 지정
canvas.width = 730;
canvas.height = 600;
document.getElementById("game").appendChild(canvas); // id가 game인 div에다가 자식으로 canvas 갇다 붙이기

let backgroundImage, spaceshipImage, bulletImage, enemyImage, gameOverImage;
let gameOver = false // true이면 게임이 끝남, false이면 게임이 안끝남
let score = 0

// 사람 좌표 > 사람 죄표는 계속 바뀌기 때문에 따로 뺴줌
let spaceshipX = 317 // 계산하기 싫으면 (canvas.width - 이미지가로크기)/2
let spaceshipY = 504 // 계산하기 싫으면 canvas.height - 이미지세로크기

// 총알 만들기
// 1. 스페이스바를 눌렀다 떼면 총알발사
// 2. 총알이 발사 = 총알의 y값이 --, 총알의 x의 값은? 스페이스를 누른 순간의 사람의 중앙에 위치
// 3. 발사된 총알들은 총알 배열에 저장을 한다.
// 4. 총알들은 x,y 좌표값이 있어야 한다.
// 5. 총알 배열을 가지고 render 그려준다.

// 총알은 지속적으로 여러개가 필요하기 때문에 따로 함수로 생성
let bulletList = [] // 총알들을 저장하는 리스트
function Bullet() { // 총알을 만들기 위한 자료, 총알 만드는 틀(자바의 클래스랑 비슷)
    this.init = function () {
        this.x = spaceshipX + 18
        this.y = spaceshipY - 60
        this.alive = true // true면 살아있는 총알, false면 죽은 총알
        bulletList.push(this)
    }

    this.update = function () {
        this.y -= 7;
    }

    // 총알.y <= 도토리.y And 총알.x >= 도토리.x and 총알.x <= 도토리.x + 도토리의 가로 길이
    // -> 닿았다

    this.checkHit = function () {
        for (let i = 0; i < enemyList.length; i++) {
            if (this.y <= enemyList[i].y && this.x >= enemyList[i].x && this.x <= enemyList[i].x + 64) {
                // -> 총알이 죽게됨, 도토리가 없어짐, 점수 획득 
                score++;
                this.alive = false // 죽은 총알
                enemyList.splice(i, 1)
            }
        }
    }
}

// 도토리의 특징
// 0. 도토리는 귀엽다.
// 1. 도토리의 위치가 랜덤하다.
// 2. 도토리는 밑으로 내려온다.
// 3. 1초마다 하나씩 도토리가 나온다.
// 4. 도토리가 바닥에 닿으면 게임 오버
// 5. 도토리와 총알이 만나면 도토리가 사라진다 점수 1점 획득
// 도토리도 지속적으로 여러개가 필요하기 때문에 따로 함수로 생성
let enemyList = []//도토리들을 저장하는 리스트
function generateRandomValue(min, max) {
    let randomNum = Math.floor(Math.random() * (max - min + 1)) + min //Math.floor : 숫자를 내려서 정수화
    return randomNum
}

function Enemy() { // 도토리를 만들기 위한 자료, 도토리 만드는 틀(자바의 클래스랑 비슷)
    this.init = function () {
        this.x = generateRandomValue(10, canvas.width - 74) // 적군의 x좌표는 랜덤하게
        this.y = 0 // y좌표는 최상단 높이
        enemyList.push(this)
    }

    this.update = function () {
        this.y += 1;

        if (this.y >= canvas.height - 64) {
            gameOver = true
            let msg = `<br><button onclick="result_form()" style='color:var(--text-color); width:200px; height:80px; background:var(--header-color); cursor:pointer; font-size:25px; font-weight:bold; margin : 0 auto; margin-top:-600px; 
            border:none; position:relative; font-family: "Nanum Gothic";'>결과 확인</button>`
            document.getElementById("main").insertAdjacentHTML("beforeend", msg)
        }
    }
}

function loadImage() { // 각 요소별 이미지 가져오기
    // new Image()는 JavaScript에서 이미지를 생성하는 데 사용되는 객체 생성자. HTML의 <img> 요소와 동일한 역할을 하지만, 
    // 코드에서 동적으로 이미지를 로드하고 다룰 수 있도록 제공.
    backgroundImage = new Image();
    backgroundImage.src = "/static/game_image/배경.jpg"

    spaceshipImage = new Image();
    spaceshipImage.src = "/static/game_image/사람비행기.png"

    bulletImage = new Image();
    bulletImage.src = "/static/game_image/던질거.png"

    enemyImage = new Image();
    enemyImage.src = "/static/front_image/dotoree.png"

    gameOverImage = new Image();
    gameOverImage.src = "/static/game_image/게임 오버.png"
}

function setupKeyboardListener() {
    addEventListener("keydown", kDown)
    addEventListener("keyup", kUp)
}

function kDown(event) {
    event.preventDefault();

    if (spaceshipY >= 0 && spaceshipY <= 504 && spaceshipX >= -32 && spaceshipX <= 666) {
        switch (event.code) {
            case 'ArrowUp':
                spaceshipY -= 10
                break;
            case 'ArrowDown':
                spaceshipY += 10
                break;
            case 'ArrowRight':
                spaceshipX += 10
                break;
            case 'ArrowLeft':
                spaceshipX -= 10
        }
    }

    if (spaceshipX < -32)
        spaceshipX = -32

    if (spaceshipX > 666)
        spaceshipX = 666

    if (spaceshipY < 0)
        spaceshipY = 0

    if (spaceshipY > 504)
        spaceshipY = 504
}

function kUp(event) {
    switch (event.code) {
        case 'Space':
            createBullet() // 총알 생성
    }
}

function createBullet() {
    let b = new Bullet() // 총알 하나 생성
    b.init()
    console.log("새로운 총알 리스트 : ", bulletList)
}

function createEnemy() {
    const interval = setInterval(function () {
        let e = new Enemy() // 도토리 하나 생성
        e.init()
    }, 1000)  // (호출하고 싶은 함수, 시간)
}

function render() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);
    ctx.fillText(`Score : ${score}`, 20, 20)
    ctx.fillStyle = "black"
    ctx.font = "20px Arial"

    // 총알의 y좌표 업데이트하는 함수 호출, 동시에 총알이 도토리를 쳤는지 동시 확인
    for (let i = 0; i < bulletList.length; i++) {
        if (bulletList[i].alive) {
            bulletList[i].update()
            bulletList[i].checkHit()
        }
    }

    for (let i = 0; i < bulletList.length; i++) {
        if (bulletList[i].alive)
            ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y)
    }

    // 외계인의 y좌표 업데이트하는 함수 호출
    for (let i = 0; i < enemyList.length; i++) {
        enemyList[i].update()
    }

    for (let i = 0; i < enemyList.length; i++) {
        ctx.drawImage(enemyImage, enemyList[i].x, enemyList[i].y, 64, 64)
    }
}

function main() {
    if (!gameOver) { // gameOver가 true면 main함수 중지
        render()
        console.log("animation calls main function")
        requestAnimationFrame(main)
    }
    else {
        let num = score
        document.getElementById("a").innerHTML = num + "개"
        document.getElementById("b").value = num
        ctx.drawImage(gameOverImage, 215, 100, 300, 300)
    }
}

loadImage() // 이미지 가져오기
setupKeyboardListener(); // 키보드 업다운 이벤트 발생
createEnemy() // 적군 생성
// render() // 단순 이미지 그리기 (이미지 안 보임)
main() // 지속적으로 이미지 그려주기 (이미지 보임)