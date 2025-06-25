import { toggleModal } from './modal.js';


export function loadHeader() {
  const modalMenu = document.querySelector('.mobile-menu-overlay');
  const modalMenuOpenBtn = document.querySelector('.burger-btn');
  const modalMenuCloseBtn = document.querySelector('.mobile-menu__close-button');

  // Mobile menu
  if (modalMenu && modalMenuOpenBtn && modalMenuCloseBtn) {
    modalMenuOpenBtn.addEventListener('click', () => toggleModal('open', modalMenu));
    modalMenuCloseBtn.addEventListener('click', () => toggleModal('close', modalMenu));

    modalMenu.addEventListener('click', ({ target }) => {
      if (target.classList.contains('mobile-menu__nav-link') || target === modalMenu) {
        toggleModal('close', modalMenu);
      }
    });
  }

  const navLinks = document.querySelectorAll('.nav-link');
  const currentPath = window.location.pathname;

  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;

    if (linkPath === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}