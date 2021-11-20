'use strict'

const MOVIE_API = "https://api.themoviedb.org/3/movie/";
const API_KEY = "170b9b9397b0574b7d603cba918ea1f4";

const filmTitleSection = document.querySelector(".film-title");

const params = new URLSearchParams(window.location.search);
let id = params.get('id');

fetch(`${MOVIE_API}${id}?api_key=${API_KEY}&language=en-US`)
    .then(res => res.json())
    .then(result => console.log(result))
    .catch(error => console.error(error));