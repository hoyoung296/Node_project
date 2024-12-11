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


document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname;
    const buttons = document.querySelectorAll("button");

    buttons.forEach(button => {
        const paths = button.getAttribute("data-path").split(" ");
        if (paths.some(path => currentPath.startsWith(path))) {
            button.classList.add("active");
        }
    });
});

