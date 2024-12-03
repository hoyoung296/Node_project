//캔버스 세팅
let canvas;
let ctx;
canvas = document.createElement("canvas") //canvas를 만들어서 변수에 저장
ctx = canvas.getContext("2d") //2d로 그림을 그려줌
//캔버스 사이즈 지정
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas); //html의 body에다가 자식으로 canvas 갇다 붙이기

let backgroundImage, spaceshipImage, bulletImage, enemyImage, gameOverImage;
let gameOver = false //true이면 게임이 끝남, false이면 게임이 안끝남
let score = 0

// 우주선 좌표 > 우주선 죄표는 계속 바뀌기 때문에 따로 뺴줌
let spaceshipX = 160
let spaceshipY = 620

// 총알 만들기
//1. 스페이스바를 누르면 총알발사
//2. 총알이 발사 = 총알의 y값이 --, 총알의 x의 값은? 스페이스를 누른 순간의 우주선의 좌표
//3. 발사된 총알들은 총알 배열에 저장을 한다.
//4. 총알들은 x,y 좌표값이 있어야 한다.
//5. 총알 배열을 가지고 render 그려준다.

// 총알은 지속적으로 여러개가 필요하기 때문에 따로 함수로 생성
let bulletList = []//총알들을 저장하는 리스트
function Bullet() { //총알을 만들기 위한 자료
    this.init = function () {
        this.x = spaceshipX + 25
        this.y = spaceshipY - 30
        this.alive = true //true면 살아있는 총알, false면 죽은 총알
    }

    bulletList.push(this)
    this.update = function () {
        this.y -= 7;
    }

    // 총알.y <= 적군 And 총알.x >= 적군.x and 총알.x <= 적군.x + 적군의 가로 길이
    // -> 닿았다

    this.checkHit = function () {
        for (let i = 0; i < enemyList.length; i++) {
            if (this.y <= enemyList[i].y && this.x >= enemyList[i].x && this.x <= enemyList[i].x + 64) {
                console.log(enemyList)
                // -> 총알이 죽게됨 적군의 우주선이 없어짐, 점수 획득 
                score++;
                this.alive = false // 죽은 총알
                enemyList.splice(i, 1)
            }
        }
    }
}

// 적군의 특징
// 0. 적군은 귀엽다.
// 1. 적군의 위치가 랜덤하다.
// 2. 적군은 밑으로 내려온다.
// 3. 1초마다 하나씩 적군이 나온다.
// 4. 적군의 우주선이 바닥에 닿으면 게임 오버
// 5. 적군과 총알이 만나면 우주선이 사라진다 점수 1점 획득

// 외계인도 지속적으로 여러개가 필요하기 때문에 따로 함수로 생성
let enemyList = []//외계인들을 저장하는 리스트
function generateRandomValue(min, max) {
    let randomNum = Math.floor(Math.random() * (max - min + 1)) + min
    return randomNum
}

function Enemy() { //외계인을 만들기 위한 자료
    this.init = function () {
        this.x = generateRandomValue(0, canvas.width - 64)
        this.y = 0
    }

    enemyList.push(this)
    this.update = function () {
        this.y += 1;

        if (this.y >= canvas.height - 64) {
            gameOver = true
            let msg = `<br><button onclick="result_form()">결과 확인</button>`
            document.getElementById("main").insertAdjacentHTML("beforeend", msg)
            // console.log(gameOver)
        }
    }
}

function loadImage() { // 각 요소별 이미지 가져오기
    backgroundImage = new Image();
    backgroundImage.src = "/static/game_image/bg3.jpg"

    spaceshipImage = new Image();
    spaceshipImage.src = "/static/game_image/비행기.png"

    bulletImage = new Image();
    bulletImage.src = "/static/game_image/총알.png"

    enemyImage = new Image();
    enemyImage.src = "/static/game_image/외계인.png"

    gameOverImage = new Image();
    gameOverImage.src = "/static/game_image/게임오버.png"
}

function setupKeyboardListener() {
    addEventListener("keydown", kDown)
    addEventListener("keyup", kUp)
}

function kDown(event) {
    if (spaceshipY >= 0 && spaceshipY <= 620 && spaceshipX >= 0 && spaceshipX <= 320) {
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

    if (spaceshipX < 0)
        spaceshipX = 0

    if (spaceshipX > 320)
        spaceshipX = 320

    if (spaceshipY < 0)
        spaceshipY = 0

    if (spaceshipY > 620)
        spaceshipY = 620
}

function kUp(event) {
    switch (event.code) {
        case 'Space':
            createBullet() //총알 생성
    }
}

function createBullet() {
    let b = new Bullet() // 총알 하나 생성
    b.init()
    // console.log("새로운 총알 리스트", bulletList)
}

function createEnemy() {
    const interval = setInterval(function () {
        let e = new Enemy() // 외계인 하나 생성
        e.init()
    }, 1000)  //(호출하고 싶은 함수, 시간)
    // console.log("새로운 외계인 리스트", enemyList)
}

function render() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);
    ctx.fillText(`Score : ${score}`, 20, 20)
    ctx.fillStyle = "black"
    ctx.font = "20px Arial"

    // 총알의 y좌표 업데이트하는 함수 호출, 동시에 총알이 적군을 쳤는지 동시 확인
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
        ctx.drawImage(enemyImage, enemyList[i].x, enemyList[i].y)
    }
}

const dotori = () => {
    let num = 5000 * score
    console.log("score : ", score)
    console.log("num : ", num)
    document.getElementById("a").innerHTML = num + "개"
    document.getElementById("b").value = num
}

function main() {
    if (!gameOver) { //gameOver가 true면 main함수 중지
        render()
        // console.log("animation calls main function")
        dotori()
        requestAnimationFrame(main)
    }
    else
        ctx.drawImage(gameOverImage, 50, 100, 300, 300)
}

// 방향키를 누르면
// 우주선의 좌표가 바뀌고
// 다시 render 그려준다.

loadImage() //이미지 가져오기
setupKeyboardListener();
createEnemy()
main() //이미지 그려주기