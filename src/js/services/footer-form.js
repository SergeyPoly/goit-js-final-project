import { postSubscription } from './api.js';

export function initFooterForm() {
  const form = document.querySelector('.footer-form');
  const emailInput = form?.querySelector('.footer-input');

  if (!form || !emailInput) return;

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = emailInput.value.trim();

    await postSubscription(email);
  });
}
