'use strict'

import filmLayout from "../templates/film.hbs";
import {
  getResults
} from "./index.js";

const refs = {
  sortCont: document.querySelectorAll("#sort")
};

refs.sortCont.forEach(sort => {
  sort.addEventListener("change", event => {
    const dataSource = sort.dataset.source;
    let results = getResults(dataSource);
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
    const markup = filmLayout(results);
    filmList.insertAdjacentHTML("beforeend", markup);
  });
})