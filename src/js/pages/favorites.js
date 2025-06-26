import { EXERCISES_PAGE_SIZE } from '../constants';
import { renderExercisesList } from '../renderers/exercises-list';
import { renderPagination } from '../renderers/pagination';
import { getStoredExercises } from '../services/storage';
import { loadHeader } from '../services/header.js';
import { getQuote } from '../services/api';

const cardInfoElement = document.querySelector(".card-info-container");
let page = 1;
let favorites = getStoredExercises();

function handlePageChange(newPage) {
  page = newPage;
  renderFavoritesList();
}

function handleFavoriteDelete(exerciseId) {
  favorites = favorites.filter(exercise => exercise._id !== exerciseId);
  renderFavoritesList();
}

function renderFavoritesList() {
  const totalPages = Math.ceil(favorites.length / EXERCISES_PAGE_SIZE);

  if (page > totalPages) {
    // if the page exceeds the total pages, reset to the last page
    // if totalPages is 0, set page to 1
    page = totalPages || 1;
  }

  const start = (page - 1) * EXERCISES_PAGE_SIZE;
  const end = page * EXERCISES_PAGE_SIZE;

  const exercisesToRender = favorites.slice(start, end);

  renderExercisesList(
    exercisesToRender,
    "It appears that you haven't added any exercises to your favorites yet. To get started, you can add exercises that you like to your favorites for easier access in the future.",
    { favorites: true, onFavoriteDelete: handleFavoriteDelete }
  );

  if (totalPages > 1) {
    renderPagination(page, totalPages, handlePageChange);
  }
}

function compareDates(date1, date2) {
  return (!date1 || !date2) ? false : date1.day === date2.day && date1.month === date2.month && date1.year === date2.year;
}

function renderQuoteToDOM({author, quote}) {
    cardInfoElement.insertAdjacentHTML('beforeend', 
      `<p class="card-description">${quote}</p>
       <p class="card-author">${author}</p>`);
}

export async function renderQuote() {
  const savedDate = JSON.parse(localStorage.getItem("favourites-today-date"));
  const today = new Date();
  const savedQuote = JSON.parse(localStorage.getItem("favourites-today-quote"));

  if (savedQuote && compareDates(savedDate, today)) {
    renderQuoteToDOM(savedQuote);
  } else {
    const {author, quote} = await getQuote();
    localStorage.setItem("favourites-today-date", JSON.stringify(today));
    localStorage.setItem("favourites-today-quote", JSON.stringify({author, quote}));
    renderQuoteToDOM(savedQuote);
  }

}

document.addEventListener('DOMContentLoaded', () => {
  renderFavoritesList();
  loadHeader();
  renderQuote();
});
