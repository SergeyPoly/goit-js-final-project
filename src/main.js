import { toggleHideDOMElement } from './js/renderers/utils';
import { renderQuote } from './js/renderers/quote';

const testBtn = document.querySelector('.test-btn');
const loader = document.querySelector('.loader');

if (testBtn && loader) {
  testBtn.addEventListener('click', async e => {
    toggleHideDOMElement(loader);
  });
}

document.addEventListener('DOMContentLoaded', renderQuote);
