import { getQuote } from '../services/api';

const quoteElement = document.querySelector('.quote-container');

function getTodayDay() {
  const date = new Date();
  return {
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear()
  };
}

function compareDates(date1, date2) {
  return !!date1 && !!date2 &&
    date1.day === date2.day &&
    date1.month === date2.month &&
    date1.year === date2.year;
}

function renderDOM({ author, quote }) {
  quoteElement.insertAdjacentHTML('beforeend', `
    <p class="quote-text">${quote}</p>
    <p class="quote-author">${author}</p>
  `);
}

export async function renderQuote() {
  const today = getTodayDay();
  const savedQuote = JSON.parse(localStorage.getItem("today-quote"));

  if (compareDates(savedQuote?.date, today) && savedQuote) {
    renderDOM(savedQuote);
  } else {
    const { author, quote } = await getQuote();
    localStorage.setItem("today-quote", JSON.stringify({ author, quote, date: today }));
    renderDOM({ author, quote });
  }
}
