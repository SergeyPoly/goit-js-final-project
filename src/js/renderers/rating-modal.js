import {
  patchRating,
} from '../services/api';
import { getIconPath } from '../utils/get-icon-path';
import { handleStart } from '../handlers/exercise-card.js';

const getScrollbarWidth = () =>
  window.innerWidth - document.documentElement.clientWidth;

function renderStars(rating) {
  const full = Math.floor(rating);
  let result = '';

  for (let i = 0; i < 5; i++) {
    let icon = i < full ? 'star-filled-icon' : 'star-icon';
    result += `
      <svg class="exercise-modal__star-icon" data-rating="${i + 1}">
        <use href="${getIconPath(icon)}"></use>
      </svg>
    `;
  }

  return result;
}

function renderSendBtn() {
  return `
    <button
      type="button"
      class="exercise-modal__fav-btn rating-modal__btn"
      data-action="send"
    >
      Send
    </button>
  `;
}

function renderRating(rating) {
  return `
    <div class="exercise-modal__rating">
      <span class="exercise-modal__rating-value rating-modal__rating-value">${rating}</span>
      <div class="exercise-modal__stars rating-modal__stars">
        ${renderStars(rating)}
      </div>
      <input name="rating" hidden="hidden" value="${rating}">
    </div>
  `
}

function addRatingListener(backdrop) {
  backdrop
    .querySelector('.exercise-modal__stars')
    .addEventListener('click', e => {
      const btn = e.target.closest('[data-rating]');
      if (!btn) return;

      const rating = btn.dataset.rating|0;

      backdrop.querySelector('.exercise-modal__rating').outerHTML = renderRating(rating);
      addRatingListener(backdrop);
    });

}

export function createRatingModal(exerciseId) {
  const modalHtml = `
    <div id="ratingModalBackdrop" class="exercise-modal__backdrop">
      <div class="exercise-modal rating-modal">
        <button class="exercise-modal__close-btn" type="button">
          <svg class="exercise-modal__close-icon">
            <use href="${getIconPath('close-icon')}"></use>
          </svg>
        </button>
        <form id="rating-form" class="exercise-modal__info-wrapper rating-modal__wrapper">
          <div class="rating-modal__item-group rating-modal__rating-group">
            <p class="rating-modal__title">Rating</p>
            <div class="exercise-modal__title-block">
              ${renderRating(0)}
            </div>
          </div>
          <div class="rating-modal__item-group">
            <input id="email" class="footer-input" name="email" pattern="^\\w+(\\.\\w+)?@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$" placeholder="Email" required />
            <textarea id="review" class="footer-input rating-modal__review-textarea" name="review" placeholder="Your comment" required></textarea>
          </div>
          <div class="exercise-modal__buttons rating-modal__item-group">
            ${renderSendBtn()}
          </div>
        </form>
      </div>
    </div>
  `;

  document.querySelector('#ratingModalBackdrop')?.remove();

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  const backdrop = document.getElementById('ratingModalBackdrop');
  const scrollbarWidth = getScrollbarWidth();

  document.body.classList.add('modal-open');
  document.documentElement.style.setProperty(
    '--scrollbar-width',
    `${scrollbarWidth}px`
  );

  setTimeout(() => {
    backdrop.classList.add('is-open');
  }, 50);

  const closeModal = () => {
    backdrop.classList.remove('is-open');
    backdrop.remove();
    document.removeEventListener('keydown', escHandler);

    handleStart(exerciseId)
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
    .addEventListener('click', async (e) => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;

      const action = btn.dataset.action;
      if (action === 'send') {
        const form = backdrop.querySelector('#rating-form');
        const rating = form.elements.rating.value|0;
        const email = form.elements.email.value;
        const review = form.elements.review.value;
        const data = await patchRating(exerciseId, rating, email, review);
        if (data) {
          closeModal()
        }
      }

      btn.outerHTML = renderSendBtn();
    });
  addRatingListener(backdrop);
}
