'use strict'

import searchResult from "../templates/search-result-page.hbs"

const params = new URLSearchParams(window.location.search);
let title = params.get('query');

const MOVIE_API = "https://api.themoviedb.org/3/";
const API_KEY = "170b9b9397b0574b7d603cba918ea1f4";

const refs = {
    searchSection: document.querySelector(".search-res-section")
}

fetch(`${MOVIE_API}search/movie?api_key=${API_KEY}&language=en-US&query=${title}&page=1`)
    .then(res => res.json())
    .then(result => {
        console.log(result);
        result.results.release_year = new Date(result.results.release_date).getFullYear();
        const markup = searchResult(result.results);
        refs.searchSection.innerHTML = markup;
    })
    .catch(error => console.error(error));