const setTheme = theme => document.documentElement.className = theme;
    function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}