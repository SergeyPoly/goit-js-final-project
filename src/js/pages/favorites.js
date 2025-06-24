import { EXERCISES_PAGE_SIZE } from '../constants';
import { renderExercisesList } from '../renderers/exercises-list';
import { getStoredExercises } from '../services/storage';

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
}

document.addEventListener('DOMContentLoaded', () => {
  renderFavoritesList();
});
