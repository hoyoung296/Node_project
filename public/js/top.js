// const setTheme = theme => document.documentElement.className = theme;

function applyThema(thema) {
    // 테마를 설정하는 로직
    document.documentElement.className = thema;
    console.log(`Setting theme to ${thema}`);
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}