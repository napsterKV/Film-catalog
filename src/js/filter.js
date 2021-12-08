import optionLayout from "../templates/filter.hbs"

const MOVIE_API = "https://api.themoviedb.org/3/";
const API_KEY = "170b9b9397b0574b7d603cba918ea1f4";

const refs = {
    filter: document.querySelector("#filter")
}

fetch(`${MOVIE_API}genre/movie/list?api_key=${API_KEY}&language=en-US`)
    .then(res => res.json())
    .then(result => {
        const markup = optionLayout(result.genres);
        refs.filter.insertAdjacentHTML("beforeend", markup);
    })
    .catch(error => console.error(error));

refs.filter.addEventListener("change", event => {
    const filmList = event.target.parentNode.parentNode.nextElementSibling;
    if (!event.target.value) {
        return;
    } else {
        console.log(filmList);
        console.log(event.target.value);
    }
});