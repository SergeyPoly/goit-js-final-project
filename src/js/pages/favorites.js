import { EVENTS, EXERCISES_PAGE_SIZE } from '../constants';
import { renderExercisesList } from '../renderers/exercises-list';
import { clearPagination, renderPagination } from '../renderers/pagination';
import { getStoredExercises } from '../services/storage';
import { loadHeader } from '../services/header.js';
import { renderQuote } from '../renderers/quote.js';
import { listenToEvent } from '../services/events.js';

let page = 1;
let favorites = getStoredExercises();

function handlePageChange(newPage) {
  page = newPage;
  renderFavoritesList();
}

function handleFavoriteDeleted(exerciseId) {
  favorites = favorites.filter(exercise => exercise._id !== exerciseId);
  renderFavoritesList();
}

function handleFavoriteAdded(exercise) {
  favorites.push(exercise);
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
    true
  );

  if (totalPages > 1) {
    renderPagination(page, totalPages, handlePageChange);
  } else {
    clearPagination();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderFavoritesList();
  loadHeader();
  renderQuote();

  listenToEvent(EVENTS.FAVORITE_REMOVED, handleFavoriteDeleted);
  listenToEvent(EVENTS.FAVORITE_ADDED, handleFavoriteAdded);
});
