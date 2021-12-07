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
const interfaceObject = Array.from(document.querySelectorAll(".interface-object"));

let currentTheme = getTheme();
if (currentTheme === Theme.DARK) {
    checkbox.setAttribute("checked", true);
    interfaceObject.forEach(obj => obj.className = "interface-obj-dark")
    setTimeout(() => {
        const filmCardTitle = document.querySelectorAll(".film-card-title");
        const searchSectionCard = document.querySelectorAll(".search-res-section .desc");
        const pageList = document.querySelectorAll(".page-list-el");
        filmCardTitle.forEach(title => {
            title.style.color = 'white';
        })
        searchSectionCard.forEach(card => {
            card.style.borderColor = "white";
        });
        pageList.forEach(item => {
            if(item.classList.contains('active')) {
                item.children[0].style.color = "white";
            }else{
                item.style.borderColor = "white";
                item.children[0].style.color = "white";
            }
            
        });
    }, 400)
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
    const searchSectionCard = document.querySelectorAll(".search-res-section .desc");
    const pageList = document.querySelectorAll(".page-list-el");
    filmCardTitle.forEach(title => {
        if(currentTheme === Theme.DARK) {
            title.style.color = 'white';
        }else{
            title.style.color = 'black';
        }
    })
    searchSectionCard.forEach(card => {
        if(currentTheme === Theme.DARK) {
            card.style.borderColor = 'white';
        }else{
            card.style.borderColor = 'black';
        }
    });
    pageList.forEach(item => {
            if(currentTheme === Theme.DARK && !item.classList.contains('active')) {
                item.style.borderColor = 'white';
                item.children[0].style.color = "white";
    
            }else if(currentTheme === Theme.DARK && item.classList.contains('active')) {
                item.children[0].style.color = "white";

            }else if(currentTheme === Theme.LIGHT && !item.classList.contains('active')){
                item.style.borderColor = 'black';
                item.children[0].style.color = "black";
            }else if (currentTheme === Theme.LIGHT && item.classList.contains('active')) {
                item.children[0].style.color = "black";
            }
            
    });
})


