import { EXERCISE_ACTIONS, EXERCISE_CARD_CLASS_NAME } from '../constants';
import { getIconPath } from '../utils/get-icon-path';

export function renderExerciseCard(exercise, isFavorite) {
  return `
    <div class="${EXERCISE_CARD_CLASS_NAME}" data-id="${exercise._id}">
      <div class="exercise-card-header">
      <p class="exercise-equipment">${exercise.equipment}</p>
        <div class="exercise-card-header-middle">
          ${
            isFavorite
              ? `<button data-action="${
                  EXERCISE_ACTIONS.REMOVE_FAVORITE
                }" class="card-icon-button remove-favorite-button">
                  <svg class="remove-favorite-icon">
                    <use href="${getIconPath('trash-icon')}"></use>
                  </svg>
                </button>`
              : `<button data-action="${
                  EXERCISE_ACTIONS.RATE
                }" class="card-icon-button rating-button">
                  ${exercise.rating.toFixed(1)}
                  <svg class="rating-icon">
                    <use href="${getIconPath('star-filled-icon')}"></use>
                  </svg>
                </button>`
          }
        </div>
        <button data-action="${EXERCISE_ACTIONS.START}" class="start-button">
          Start
          <svg class="arrow-icon" width="13" height="13">
            <use href="${getIconPath('arrow-icon')}"></use>
          </svg>
        </button>
      </div>
      <div class="exercise-card-body">
        <div class="exercise-name-container">
          <svg class="exercise-icon" width="24" height="24">
            <use href="${getIconPath('running-man-icon')}"></use>
          </svg>
          <h3 class="exercise-name">${exercise.name}</h3>
        </div>
      </div>
      <div class="exercise-card-footer">
        <p class="card-footer-text">
          <span class="secondary-text">Burned calories:</span>
          ${exercise.burnedCalories} / ${exercise.time} min
        </p>
        <p class="card-footer-text">
          <span class="secondary-text">Body part:</span>
          ${exercise.bodyPart}
        </p>
        <p class="card-footer-text">
          <span class="secondary-text">Target:</span>
          ${exercise.target}
        </p>
      </div>
    </div>
  `;
}
