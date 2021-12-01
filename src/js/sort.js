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
      result.results.forEach(film => {
        if (!film.poster_path) {
          film.poster_path = '';
          film.poster_path = "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";
          film.posterClass = "noposter";
        } else {
          film.poster_path = `https://image.tmdb.org/t/p/original/${film.poster_path}`;
          film.posterClass = "";
        }
      });
      refs.filmLists.forEach(filmList => {
        filmList.innerHTML = "";
        const markup = film(result.results);
        filmList.insertAdjacentHTML("beforeend", markup);
      });
    })
    .catch(error => console.error(error));
});