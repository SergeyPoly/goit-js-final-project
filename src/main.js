import { toggleHideDOMElement } from './js/renders.js';
import { renderQuote } from './js/render-quote.js';

const testBtn = document.querySelector('.test-btn');
const loader = document.querySelector('.loader');

if (testBtn && loader) {
  testBtn.addEventListener('click', async (e) => {
    toggleHideDOMElement(loader);
  });
}

document.addEventListener("DOMContentLoaded", renderQuote);