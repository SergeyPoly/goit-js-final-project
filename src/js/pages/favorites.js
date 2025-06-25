import { EXERCISES_PAGE_SIZE } from '../constants';
import { renderExercisesList } from '../renderers/exercises-list';
import { renderPagination } from '../renderers/pagination';
import { getStoredExercises } from '../services/storage';
import { loadHeader } from '../services/header.js';

let page = 0;
const favorites = getStoredExercises();

function renderFavoritesList() {
  const start = page * EXERCISES_PAGE_SIZE;
  const end = (page + 1) * EXERCISES_PAGE_SIZE;
  const exercisesToRender = favorites.slice(start, end);

  renderExercisesList(
    exercisesToRender,
    "It appears that you haven't added any exercises to your favorites yet. To get started, you can add exercises that you like to your favorites for easier access in the future.",
    true
  );

  const totalPages = Math.ceil(favorites.length / EXERCISES_PAGE_SIZE);

  if (totalPages > 1) {
    renderPagination(page, totalPages, newPage => {
      page = newPage;
      renderFavoritesList();
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderFavoritesList();

  loadHeader();
});
