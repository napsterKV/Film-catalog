import optionLayout from "../templates/filter.hbs"
import searchLayout from "../templates/search-result-page.hbs"

const MOVIE_API = "https://api.themoviedb.org/3/";
const API_KEY = "170b9b9397b0574b7d603cba918ea1f4";

const refs = {
  filter: document.querySelector("#filter"),
}

fetch(`${MOVIE_API}genre/movie/list?api_key=${API_KEY}&language=en-US`)
  .then(res => res.json())
  .then(result => {
    const markup = optionLayout(result.genres);
    refs.filter.insertAdjacentHTML("beforeend", markup);
  })
  .catch(error => console.error(error));

export function filter(results) {
  if (refs.filter.value) {
    const selectedFilter = [...refs.filter.options].filter(option => option.selected).map(option => parseInt(option.value));
    const filtered = results.filter(film => {
      return film.genre_ids.some(id => selectedFilter.includes(id));
    });
    return filtered;
  } else {
    return results;
  }
}