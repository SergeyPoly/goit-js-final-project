import { EXERCISE_ACTIONS, EXERCISE_CARD_CLASS_NAME } from '../constants';
import {
  handleRate,
  handleRemoveFavorite,
  handleStart,
} from '../handlers/exercise-card';
import { renderExerciseCard } from './exercise-card';

const listEl = document.querySelector('.exercises-list-wrapper');

export function renderExercisesList(
  exercises,
  emptyMessage,
  favorites,
) {
  listEl.innerHTML = ''; // Clear the list before rendering

  if (favorites) {
    listEl.classList.add('favorites');
  }

  let content = '';

  if (!exercises.length) {
    content = `<p class="no-exercises-message">${emptyMessage}</p>`;
  } else {
    exercises.forEach(exercise => {
      content += renderExerciseCard(exercise, favorites);
    });
  }

  listEl.insertAdjacentHTML('beforeend', content);

  listEl.onclick = e => {
    let target = e.target;

    if (target.nodeName !== 'BUTTON') {
      target = target.closest(`.${EXERCISE_CARD_CLASS_NAME} button`);
    }
    if (!target || target.nodeName !== 'BUTTON') {
      return;
    }

    const exerciseCard = target.closest(`.${EXERCISE_CARD_CLASS_NAME}`);
    const exerciseId = exerciseCard.dataset.id;
    const action = target.dataset.action;

    switch (action) {
      case EXERCISE_ACTIONS.REMOVE_FAVORITE:
        handleRemoveFavorite(exerciseId);
        break;

      case EXERCISE_ACTIONS.START:
        handleStart(exerciseId);
        break;

      case EXERCISE_ACTIONS.RATE:
        handleRate(exerciseId);
        break;

      default:
        console.warn('Unknown action:', action);
    }
  };
}
