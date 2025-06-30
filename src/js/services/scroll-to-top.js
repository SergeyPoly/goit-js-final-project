// Создание кнопки
const createScrollToTopBtn = () => {
  const btn = document.createElement('button');
  btn.id = 'scrollToTopBtn';
  btn.className = 'scroll-to-top-btn';
  btn.style.display = 'none';

  btn.innerHTML = `
    <svg class="logo-icon" width="28" height="28">
      <use href="./img/icons.svg#arrow-icon-default"></use>
    </svg>
  `;

  document.body.appendChild(btn);

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  return btn;
};

let scrollBtn = null;

const handleScroll = () => {
  const scrollY = window.scrollY || window.pageYOffset;
  const footer = document.querySelector('footer');
  if (!scrollBtn && scrollY > 100) {
    scrollBtn = createScrollToTopBtn();
  }
  if (scrollBtn) {
    if (scrollY > 100) {
      scrollBtn.style.display = 'flex';
    } else {
      scrollBtn.style.display = 'none';
      scrollBtn.remove();
      scrollBtn = null;
    }

    if (footer) {
      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (footerRect.top < windowHeight) {
        scrollBtn.style.display = 'none';
        scrollBtn.remove();
        scrollBtn = null;
      }
    }
  }
};

export const initScrollToTop = () => {
  window.addEventListener('scroll', handleScroll);
};