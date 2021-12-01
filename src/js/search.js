'use strict'

import searchResult from "../templates/search-result-page.hbs"

const params = new URLSearchParams(window.location.search);
let title = params.get('query');
const MOVIE_API = "https://api.themoviedb.org/3/";
const API_KEY = "170b9b9397b0574b7d603cba918ea1f4";

const refs = {
    searchSection: document.querySelector(".search-res-section"),
    requestTitle: document.querySelector(".request"),
    pageChanger: document.querySelector(".page-list"),
}

let page = 1;
let pagesLimit = 8;
refs.pageChanger.addEventListener("click", e => {
   window.location.reload()
   console.log(e.target);
   page = e.target.getAttribute("data-page"); 
   sessionStorage.setItem("page", JSON.stringify(page))
});

fetch(`${MOVIE_API}search/movie?api_key=${API_KEY}&language=en-US&query=${title}&page=${JSON.parse(sessionStorage.getItem("page"))}`)
    .then(res => res.json())
    .then(result => {
        refs.requestTitle.textContent = title;
        result.results.forEach(film => {
            if (!film.poster_path) {
                film.poster_path = "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";
                film.posterClass = "noposter";
            } else {
                film.poster_path = `https://www.themoviedb.org/t/p/w188_and_h282_bestv2${film.poster_path}`;
                film.posterClass = "";
            }

            if (!film.release_date) {
                film.release_year = "NB";
            } else {
                film.release_year = new Date(film.release_date).getFullYear();
            }
        });
        const markup = searchResult(result.results);
        refs.searchSection.innerHTML = markup;

        if(result.total_pages < 8) {
            pagesLimit = result.total_pages;
            console.log(pagesLimit);
        }

        for(let i = 1; i <= pagesLimit; i++) {
            const pageChangerEl = `<li class="page-list-el" data-page="${i}"><a href="#" data-page="${i}">${i}</a></li>`
            refs.pageChanger.insertAdjacentHTML("beforeend", pageChangerEl);
        }
    })
    .catch(error => console.error(error));

    
