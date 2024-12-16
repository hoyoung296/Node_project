const choice = (price, dotori, no) => {
    $("#purchase").slideDown('slow')
    $("#modal_wrap").show()
    $("#price").text(price)
    let result = dotori - price

    console.log("남은 도토리 : ", result)
    let yesButton = document.getElementById("yes")
    let noButton = document.getElementById("no")
    if(result < 0){
        document.getElementById("noDotori").innerText = "도토리가 부족합니다"
        yesButton.innerHTML = "도토리 얻으러 가기"
        yesButton.addEventListener("click", () => {
            location.href='/game'}) 
        noButton.innerText = "닫기"
    }else{
        yesButton.innerText = "예"
        yesButton.addEventListener("click", () => { 
            location.href='/product/purchase?no='+no}) 
        noButton.innerText = "아니요"
        noButton.addEventListener("click", () => {
            location.href='/product'})
    }
}

const choice_hide = () => {
    $("#fist").hide()
    $("#modal_wrap").hide()
    location.href='/product'
}