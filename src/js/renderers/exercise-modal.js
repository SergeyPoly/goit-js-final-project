import { EXERCISE_ACTIONS } from '../constants.js';
import {
  handleAddFavorite,
  handleRemoveFavorite,
} from '../handlers/exercise-card.js';
import { getStoredExercises } from '../services/storage';
import { getIconPath } from '../utils/get-icon-path';
import { createRatingModal } from './rating-modal.js';

const getScrollbarWidth = () =>
  window.innerWidth - document.documentElement.clientWidth;

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function renderStars(rating) {
  const full = Math.floor(rating);
  let result = '';

  for (let i = 0; i < 5; i++) {
    let icon = i < full ? 'star-filled-icon' : 'star-icon';
    result += `
      <svg class="exercise-modal__star-icon">
        <use href="${getIconPath(icon)}"></use>
      </svg>
    `;
  }

  return result;
}

function renderFavBtn(exercise) {
  const isStored = getStoredExercises().some(e => e._id === exercise._id);

  return `
    <button
      type="button"
      class="exercise-modal__fav-btn"
      data-action="${
        isStored
          ? EXERCISE_ACTIONS.REMOVE_FAVORITE
          : EXERCISE_ACTIONS.ADD_FAVORITE
      }"
    >
      ${isStored ? 'Remove from favorites' : 'Add to favorites'}
      <svg class="exercise-modal__fav-icon" width="18" height="18">
        <use href="${
          isStored
            ? `${getIconPath('trash-icon')}`
            : `${getIconPath('heart-icon')}`
        }"></use>
      </svg>
    </button>
  `;
}

export function createExerciseModal(data) {
  const modalHtml = `
    <div id="exerciseModalBackdrop" class="exercise-modal__backdrop">
      <div class="exercise-modal">
        <button class="exercise-modal__close-btn" type="button">
          <svg class="exercise-modal__close-icon">
            <use href="${getIconPath('close-icon')}"></use>
          </svg>
        </button>

        <div class="exercise-modal__content">
      <div class="exercise-modal__image-wrapper">
          <img src="${data.gifUrl}" alt="${
    data.name
  }"class="exercise-modal__image" />
        </div>
        <div class="exercise-modal__info-wrapper">
          <div class="exercise-modal__title-block">
            <h2 class="exercise-modal__name">${capitalize(data.name)}</h2>
            <div class="exercise-modal__rating">
              <span class="exercise-modal__rating-value">${data.rating}</span>
              <div class="exercise-modal__stars">
                ${renderStars(data.rating)}
              </div>
            </div>
          </div>
          <ul class="exercise-modal__info-list">
            <li class="exercise-modal__info-item"><p class="exercise-modal__label">Target</p><p class="exercise-modal__value">${capitalize(
              data.target
            )}</p></li>
            <li class="exercise-modal__info-item"><p class="exercise-modal__label">Body Part</p><p class="exercise-modal__value">${capitalize(
              data.bodyPart
            )}</p></li>
            <li class="exercise-modal__info-item"><p class="exercise-modal__label">Equipment</p><p class="exercise-modal__value">${capitalize(
              data.equipment
            )}</p></li>
            <li class="exercise-modal__info-item"><p class="exercise-modal__label">Popular</p><p class="exercise-modal__value">${
              data.popularity
            }</p></li>
            <li class="exercise-modal__info-item"><p class="exercise-modal__label">Burned calories</p><p class="exercise-modal__value">${
              data.burnedCalories
            }/${data.time} min</p></li>
          </ul>
          <p class="exercise-modal__description">${data.description}</p>
        </div>
        </div>

        <div class="exercise-modal__buttons">
            ${renderFavBtn(data)}
            <button type="button" class="exercise-modal__rating-btn" data-action="${
              EXERCISE_ACTIONS.RATE
            }">Give a rating</button>
        </div>
        </div>
      </div>
    </div>
  `;

  document.querySelector('#exerciseModalBackdrop')?.remove();

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  const backdrop = document.getElementById('exerciseModalBackdrop');
  const scrollbarWidth = getScrollbarWidth();

  document.body.classList.add('modal-open');
  document.documentElement.style.setProperty(
    '--scrollbar-width',
    `${scrollbarWidth}px`
  );

  setTimeout(() => {
    backdrop.classList.add('is-open');
  }, 50);

  const closeModal = (isClosing = true) => {
    backdrop.classList.remove('is-open');
    document.removeEventListener('keydown', escHandler);

    if (isClosing) {
      setTimeout(() => {
        document.body.classList.remove('modal-open');
        document.documentElement.style.removeProperty('--scrollbar-width');
      }, 300);
    }

    backdrop.remove();
  };

  backdrop
    .querySelector('.exercise-modal__close-btn')
    .addEventListener('click', closeModal);

  backdrop.addEventListener('click', e => {
    if (e.target === backdrop) closeModal();
  });

  function escHandler(e) {
    if (e.key === 'Escape') closeModal();
  }
  document.addEventListener('keydown', escHandler);

  backdrop
    .querySelector('.exercise-modal__buttons')
    .addEventListener('click', e => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;

      const action = btn.dataset.action;
      switch (action) {
        case EXERCISE_ACTIONS.ADD_FAVORITE:
          handleAddFavorite(data);
          break;
        case EXERCISE_ACTIONS.REMOVE_FAVORITE:
          handleRemoveFavorite(data._id);
          break;
        case EXERCISE_ACTIONS.RATE:
          closeModal(false);
          createRatingModal(data._id);
          break;
        default:
          console.warn('Unknown action:', action);
      }

      btn.outerHTML = renderFavBtn(data);
    });
}
