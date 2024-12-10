// const setTheme = theme => document.documentElement.className = theme;

function applyTheme(theme) {
    // 테마를 설정하는 로직
    document.documentElement.className = theme;
    console.log(`Setting theme to ${theme}`);
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}