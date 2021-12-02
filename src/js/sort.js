'use strict'

import film from "../templates/film.hbs"

const MOVIE_API = "https://api.themoviedb.org/3/";
const API_KEY = "170b9b9397b0574b7d603cba918ea1f4";

const refs = {
  filmLists: document.querySelectorAll(".film-list"),
  sortCont: document.querySelector("#sort")
}

refs.sortCont.addEventListener("change", event => {
  fetch(`${MOVIE_API}discover/movie?api_key=${API_KEY}&language=en-US&sort_by=${event.target.value}`)
    .then(res => res.json())
    .then(result => {
      
    })
    .catch(error => console.error(error));
});