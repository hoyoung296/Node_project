function applyThema(thema) {// 테마를 설정하는 로직
    document.documentElement.className = thema;
    console.log(`Setting theme to ${thema}`);
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// document.addEventListener("DOMContentLoaded", () => {
//     const currentPath = window.location.pathname;
//     const buttons = document.querySelectorAll("button");

//     buttons.forEach(button => {
//         const dataPath = button.getAttribute("data-path");

//         // data-path가 존재하는지 확인
//         if (dataPath) {
//             const paths = dataPath.split(" ");
//             if (paths.some(path => currentPath.startsWith(path))) {
//                 button.classList.add("active");
//             }
//         }
//     });
// });
// 에러발생 삭제예정

const choice = (price, dotori) => {
    $("#purchase").slideDown('slow')
    $("#modal_wrap").show()
    $("#price").text(price)
    result = dotori - price
    $("#dotori").text(result)
}

const choice_hide = () => {
    $("#fist").hide()
    $("#modal_wrap").hide()
    location.href='/product'
}
