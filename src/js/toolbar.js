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
const interfaceObject =Array.from(document.querySelectorAll(".interface-object"));

let currentTheme = getTheme();
if (currentTheme === Theme.DARK) {
    checkbox.setAttribute("checked", true);
    interfaceObject.forEach(obj => obj.className = "interface-obj-dark")
    setTimeout(() => {
        const filmCardTitle = document.querySelectorAll(".film-card-title");
        filmCardTitle.forEach(title => {
            title.style.color = 'white';
        })
    }, 600)
}else{
    interfaceObject.forEach(obj => obj.className = "interface-obj-light")
}

body.classList.add(currentTheme);

checkbox.addEventListener("change", event => {
    body.classList.remove(currentTheme);
    currentTheme = currentTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    body.classList.add(currentTheme);
    setTheme(currentTheme);
    interfaceObject.forEach(obj => {
        obj.className = "";
        if(currentTheme === Theme.DARK){
            obj.className = "interface-obj-dark"
        }else{
            obj.className = "interface-obj-light"
        }
    });
    const filmCardTitle = document.querySelectorAll(".film-card-title");
    filmCardTitle.forEach(title => {
        if(currentTheme === Theme.DARK) {
            title.style.color = 'white';
        }else{
            title.style.color = 'black';
        }
    })
},0)


