import { toggleHideDOMElement } from './js/renderers/utils';
import { renderQuote } from './js/renderers/quote';
import { getExercises } from './js/services/api';
import { renderExercisesList } from './js/renderers/exercises-list';
import { loadHeader } from './js/services/header.js';

const testBtn = document.querySelector('.test-btn');
const loader = document.querySelector('.loader');

if (testBtn && loader) {
  testBtn.addEventListener('click', async e => {
    toggleHideDOMElement(loader);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderQuote();

  getExercises({}).then(({ results: exercises }) => {
    renderExercisesList(exercises, 'No exercises found');
  });

  loadHeader();
});
