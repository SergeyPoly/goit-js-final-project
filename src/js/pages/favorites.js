import { EXERCISES_PAGE_SIZE } from '../constants';
import { renderExercisesList } from '../renderers/exercises-list';
import { renderPagination } from '../renderers/pagination';
import { getStoredExercises } from '../services/storage';

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

document.addEventListener('DOMContentLoaded', () => {
  renderFavoritesList();
});
