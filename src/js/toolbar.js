const { stubFalse } = require("lodash");

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
    setTimeout(() => {
        const filmCardTitle = document.querySelectorAll(".film-card-title");
        filmCardTitle.forEach(title => {
            title.style.color = 'white';
        })
    }, 600)
}

body.classList.add(currentTheme);

checkbox.addEventListener("change", event => {
    body.classList.remove(currentTheme);
    currentTheme = currentTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    body.classList.add(currentTheme);
    setTheme(currentTheme);
        const filmCardTitle = document.querySelectorAll(".film-card-title");
        filmCardTitle.forEach(title => {
            if(body.classList.value === Theme.DARK) {
                title.style.color = 'white';
            }else{
                title.style.color = 'black';
            }
        })
    },0)


