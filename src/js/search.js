'use strict'

import searchResult from "../templates/search-result-page.hbs";

let results;

const params = new URLSearchParams(window.location.search);
let title = params.get('query');
const MOVIE_API = "https://api.themoviedb.org/3/";
const API_KEY = "170b9b9397b0574b7d603cba918ea1f4";
let page = 1;

let pagesLimit = 8;
const refs = {
    searchSection: document.querySelector(".search-res-section"),
    requestTitle: document.querySelector(".request"),
    pageChanger: document.querySelector(".page-list"),
    pageChangerEl: document.querySelector(".page-list").getElementsByTagName("li"),
    sortCont: document.querySelector("#sort")
}
setTimeout(() => {
    if(sessionStorage.length === 0) {
        const pageChangerArr = Array.from(refs.pageChangerEl);
        pageChangerArr[0].classList.add("active");
        pageChangerArr[0].style.border = "1px solid #3355ff";

    }
}, 300);


setTimeout(() => {
    
    const pageChangerArr = Array.from(refs.pageChangerEl);
    pageChangerArr.find(item => {
        if(item.getAttribute("data-page") === JSON.parse(sessionStorage.getItem("page"))) {
            item.classList.add("active");
            item.style.border = "1px solid #3355ff";
        }
    });

    
}, 400)

refs.pageChanger.addEventListener("click", e => {
   window.location.reload();
   page = e.target.getAttribute("data-page"); 
   sessionStorage.setItem("page", JSON.stringify(page))
});

fetch(`${MOVIE_API}search/movie?api_key=${API_KEY}&language=en-US&query=${title}&page=${JSON.parse(sessionStorage.getItem("page"))}`)
    .then(res => res.json())
    .then(result => {
        refs.requestTitle.textContent = title;
        results = result.results;
        results.forEach(film => {
            if (!film.poster_path) {
                film.poster_path = "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";
                film.posterClass = "noposter";
            } else {
                film.poster_path = `https://www.themoviedb.org/t/p/w188_and_h282_bestv2${film.poster_path}`;
                film.posterClass = "";
            }

            if (!film.release_date) {
                film.release_year = "NYR";
            } else {
                film.release_year = new Date(film.release_date).getFullYear();
            }
        });
        const markup = searchResult(results);
        refs.searchSection.innerHTML = markup;

        if(result.total_pages < 8) {
            pagesLimit = result.total_pages;
        }

        for(let i = 1; i <= pagesLimit; i++) {
            const pageChangerEl = `<li class="page-list-el" data-page="${i}"><a href="#" data-page="${i}">${i}</a></li>`
            refs.pageChanger.insertAdjacentHTML("beforeend", pageChangerEl);
        }
    })
    .catch(error => console.error(error));
  

refs.sortCont.addEventListener("change", event => {
    const filmList = event.target.parentNode.parentNode.nextElementSibling;
    filmList.innerHTML = '';
    switch (event.target.value) {
      case "popularity.desc":
        results = results.sort((a, b) => {
          return b.popularity - a.popularity;
        });
        break;

      case "popularity.asc":
        results = results.sort((a, b) => {
          return a.popularity - b.popularity;
        });
        break;

      case "original_title.desc":
        results = results.sort((a, b) => {
          return -a.title.localeCompare(b.title);
        });
        break;

      case 'original_title.asc':
        results = results.sort((a, b) => {
          return a.title.localeCompare(b.title);
        });
        break;

      case 'vote_average.desc':
        results = results.sort((a, b) => {
          return b.vote_average - a.vote_average;
        });
        break;

      case 'vote_average.asc':
        results = results.sort((a, b) => {
          return a.vote_average - b.vote_average;
        });
        break;

      default:
        break;
    }
    const markup = searchResult(results);
    filmList.insertAdjacentHTML("beforeend", markup);
  });