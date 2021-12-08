import debounce from 'lodash.debounce';
import filmLayout from "../templates/film.hbs";
import searchResultLayout from "../templates/searchResult.hbs";

const MOVIE_API = "https://api.themoviedb.org/3/movie/";
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

const results = {
  nowPlaying: [],
  popular: [],
  topRated: [],
  upcoming: []
};

sessionStorage.removeItem("page");



refs.searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  window.location.href = `search.html?query=${refs.searchInput.value}`;
})

refs.searchInput.addEventListener("input", debounce(e => {
  if (e.target.value != '') {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=170b9b9397b0574b7d603cba918ea1f4&language=en-US&query=${e.target.value}&page=1`).then(res => res.json())
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

window.onload = () => {
  fetch(`${MOVIE_API}now_playing?api_key=170b9b9397b0574b7d603cba918ea1f4&language=en-US`).then(res => res.json())
    .then(res => {
      results.nowPlaying = res.results;
      let markup = ``;
      markup += filmLayout(res.results);
      refs.latestFilmList.insertAdjacentHTML("beforeend", markup)
    });


  fetch(`${MOVIE_API}popular?api_key=170b9b9397b0574b7d603cba918ea1f4&language=en-US`).then(res => res.json())
    .then(res => {
      results.popular = res.results;
      let markup = ``;
      markup += filmLayout(res.results);
      refs.popularFilmList.insertAdjacentHTML("beforeend", markup)
    });

  fetch(`${MOVIE_API}top_rated?api_key=170b9b9397b0574b7d603cba918ea1f4&language=en-US`).then(res => res.json())
    .then(res => {
      results.topRated = res.results;
      let markup = ``;
      markup += filmLayout(res.results);
      refs.topRatedFilmList.insertAdjacentHTML("beforeend", markup)
    });

  fetch(`${MOVIE_API}upcoming?api_key=170b9b9397b0574b7d603cba918ea1f4&language=en-US`).then(res => res.json())
    .then(res => {
      results.upcoming = res.results;
      let markup = ``;
      markup += filmLayout(res.results);
      refs.upcomingFilmList.insertAdjacentHTML("beforeend", markup)
    });
};

const getResults = (source) => {
  return results[source];
}

export {
  getResults
};
