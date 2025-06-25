import { EXERCISE_CARD_CLASS_NAME } from '../constants';
import { handleExerciseCardAction } from '../handlers/exercise-card';
import { renderExerciseCard } from './exercise-card';

const listEl = document.querySelector('.exercises-list');

export function renderExercisesList(exercises, emptyMessage, isFavorite) {
  listEl.innerHTML = ''; // Clear the list before rendering

  if (isFavorite) {
    listEl.classList.add('favorites');
  }

  let content = '';

  if (!exercises.length) {
    content = `<p class="no-exercises-message">${emptyMessage}</p>`;
  } else {
    exercises.forEach(exercise => {
      content += renderExerciseCard(exercise, isFavorite);
    });
  }

  listEl.insertAdjacentHTML('beforeend', content);
}

listEl.addEventListener('click', e => {
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

  handleExerciseCardAction(listEl, exerciseId, action);
});
