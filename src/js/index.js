import debounce from 'lodash.debounce';
import filmLayout from "../templates/film.hbs";
import searchResultLayout from "../templates/searchResult.hbs";
import {sort} from "./sort.js";

const MOVIE_API = "https://api.themoviedb.org/3/movie/";
const API_KEY = "170b9b9397b0574b7d603cba918ea1f4";
const refs = {
  searchForm: document.querySelector(".search-form"),
  searchInput: document.querySelector(".search-form input[type=text]"),
  searchInput: document.querySelector(".search input"),
  searchResults: document.querySelector(".search-results"),
  popularFilmList: document.querySelector(".popular-film-list"),
  latestFilmList: document.querySelector(".latest-film-list"),
  topRatedFilmList: document.querySelector(".top_rated-film-list"),
  upcomingFilmList: document.querySelector(".upcoming-film-list")
}

sessionStorage.removeItem("page");

refs.searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  window.location.href = `search.html?query=${refs.searchInput.value}`;
})

refs.searchInput.addEventListener("input", debounce(e => {
  if (e.target.value != '') {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${e.target.value}&page=1`).then(res => res.json())
      .then(res => {
        if (res.results) {
          res.results.length = 10;
        }
        let markup = ``;
        markup += searchResultLayout(res.results);
        refs.searchResults.innerHTML = markup;
      })
  } else {
    refs.searchResults.innerHTML = "";
  };
}, 500));

function applyMarkup(results, element) {
  const markup = filmLayout(results);
  element.insertAdjacentHTML("beforeend", markup);
  if(document.querySelector("body").classList.contains("dark-theme")) {
    Array.from(document.querySelectorAll(".film-card-title")).forEach(el => {
      el.style.color = "white"; 
    })
  }
}

function fetchData(url, element) {
  fetch(`${MOVIE_API}${url}?api_key=${API_KEY}&language=en-US`).then(res => res.json())
    .then(res => {
      const sortElement = element.previousElementSibling.querySelector("#sort");
      sortElement.addEventListener("change", event => {
        element.innerHTML = '';
        const results = sort(res.results, event.target.value);
        applyMarkup(results, element);
      });
      applyMarkup(res.results, element);
    });
}

window.onload = () => {
  fetchData("now_playing", refs.latestFilmList);
  fetchData("popular", refs.popularFilmList);
  fetchData("top_rated", refs.topRatedFilmList);
  fetchData("upcoming", refs.upcomingFilmList);
};