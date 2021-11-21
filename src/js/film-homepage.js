'use strict'

import filmTitle from "../templates/film-homepage-title.hbs";
import filmTrailer from "../templates/film-trailer.hbs"

const MOVIE_API = "https://api.themoviedb.org/3/movie/";
const API_KEY = "170b9b9397b0574b7d603cba918ea1f4";

const filmTitleSection = document.querySelector(".film-title");
const filmTrailerSection = document.querySelector(".film-trailer");

const params = new URLSearchParams(window.location.search);
let id = params.get('id');

fetch(`${MOVIE_API}${id}?api_key=${API_KEY}&language=en-US`)
  .then(res => res.json())
  .then(result => {
    result.release_year = new Date(result.release_date).getFullYear();
    const markup = filmTitle(result);
    filmTitleSection.innerHTML = markup;
  })
  .catch(error => console.error(error));

fetch(`${MOVIE_API}${id}/videos?api_key=${API_KEY}&language=en-US`)
  .then(res => res.json())
  .then(result => {
    const trailers = result.results.filter(film => film.type === "Trailer");
    const teasers = result.results.filter(film => film.type === "Teaser");
    const trailer = trailers.length > 0 ? trailers[0] : teasers.length > 0 ? teasers[0] : null;
    if (trailer) {
      console.log(trailer);
      const trailerMarkup = filmTrailer(trailer);
      filmTrailerSection.innerHTML = trailerMarkup;
    }
  })
  .catch(error => console.error(error));