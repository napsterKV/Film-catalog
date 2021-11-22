const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const defaultTheme = Theme.LIGHT;

function getTheme() {
    let theme = localStorage.getItem("theme");
    if (!theme) {
        theme = defaultTheme;
        setTheme(theme);
    }

    return theme;
}

function setTheme(theme) {
    localStorage.setItem("theme", theme);
}

const checkbox = document.querySelector("#theme-switch-toggle");
const body = document.querySelector("body");

let currentTheme = getTheme();
if (currentTheme === Theme.DARK) {
    checkbox.setAttribute("checked", true);
}

body.classList.add(currentTheme);

checkbox.addEventListener("change", event => {
    body.classList.remove(currentTheme);
    currentTheme = currentTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    body.classList.add(currentTheme);
    setTheme(currentTheme);
});