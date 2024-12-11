

function applyThema(thema) {// 테마를 설정하는 로직
    document.documentElement.className = thema;
    console.log(`Setting theme to ${thema}`);
}

// async function saveThema(uid, thema_no) {
//     try {
//         // pdao.saveThema가 비동기 함수라면, 그것이 끝날 때까지 기다리도록 함
//         await pdao.saveThema(uid, thema_no);
//         console.log(`Theme saved: ${thema_no} for user ${uid}`);
//     } catch (error) {
//         console.error("Error saving theme:", error);
//     }
// }

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
