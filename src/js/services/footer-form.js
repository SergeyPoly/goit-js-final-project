export function initFooterForm() {
  const form = document.querySelector('.footer-form');
  const emailInput = form?.querySelector('.footer-input');

  if (!form || !emailInput) return;

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = emailInput.value.trim();
    const emailPattern = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    try {
      const response = await fetch('https://your-energy.b.goit.study/api/subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Network error');
      }

      alert('Subscription successful! Thank you.');
      form.reset();
    } catch (error) {
      console.error('Subscription failed:', error);
      alert('Something went wrong. Please try again later.');
    }
  });
}
