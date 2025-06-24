import { getQuote } from '../services/api';

// const quoteElement = document.querySelector('.quote');

export async function renderQuote() {
  const { author, quote } = await getQuote();
  quoteElement.insertAdjacentHTML(
    'beforeend',
    `
      <p>${quote}</p>
      <p>${author}</p>
    `
  );
}
