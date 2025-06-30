import { toggleModal } from './modal.js';

function moveNavUnderline(fromLink = null, toLink = null) {
  if (window.innerWidth < 768) return;
  const navList = document.querySelector('.nav-list');
  const navUnderline = navList ? navList.querySelector('.nav-underline') : null;
  const activeLink = toLink || (navList ? navList.querySelector('.nav-link.active') : null);
  if (!navUnderline || !activeLink) return;

  if (fromLink && fromLink !== activeLink) {
    const { offsetLeft, offsetWidth } = fromLink;
    navUnderline.style.transition = 'none';
    navUnderline.style.left = offsetLeft + 'px';
    navUnderline.style.width = offsetWidth + 'px';
    requestAnimationFrame(() => {
      navUnderline.style.transition = 'left 0.6s cubic-bezier(.77,0,.18,1), width 0.4s cubic-bezier(.77,0,.18,1)';
      const { offsetLeft, offsetWidth } = activeLink;
      navUnderline.style.left = offsetLeft + 'px';
      navUnderline.style.width = offsetWidth + 'px';
    });
  } else {
    const { offsetLeft, offsetWidth } = activeLink;
    navUnderline.style.transition = 'left 0.6s cubic-bezier(.77,0,.18,1), width 0.4s cubic-bezier(.77,0,.18,1)';
    navUnderline.style.left = offsetLeft + 'px';
    navUnderline.style.width = offsetWidth + 'px';
  }
}

function updateActiveLinkAndUnderline() {
  const navLinks = document.querySelectorAll('.nav-link');
  let currentPath = window.location.pathname;
  if (currentPath.endsWith('/') || currentPath.endsWith('/index.html')) {
    currentPath = '/index.html';
  }
  let currentLink = null;
  navLinks.forEach(link => {
    let linkPath = new URL(link.href).pathname;
    if (linkPath.endsWith('/') || linkPath.endsWith('/index.html')) {
      linkPath = '/index.html';
    }
    if (linkPath === currentPath) {
      currentLink = link;
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
  if (window.innerWidth >= 768 && currentLink) {
    moveNavUnderline(currentLink, currentLink);
  }
}

export function loadHeader() {
  const modalMenu = document.querySelector('.mobile-menu-overlay');
  const modalMenuOpenBtn = document.querySelector('.burger-btn');
  const modalMenuCloseBtn = document.querySelector('.mobile-menu__close-button');

  if (modalMenu && modalMenuOpenBtn && modalMenuCloseBtn) {
    modalMenuOpenBtn.addEventListener('click', () => toggleModal('open', modalMenu));
    modalMenuCloseBtn.addEventListener('click', () => toggleModal('close', modalMenu));
    modalMenu.addEventListener('click', ({ target }) => {
      if (target.classList.contains('mobile-menu__nav-link') || target === modalMenu) {
        toggleModal('close', modalMenu);
      }
    });
  }

  const navList = document.querySelector('.nav-list');
  if (window.innerWidth >= 768 && navList && !navList.querySelector('.nav-underline')) {
    const underline = document.createElement('span');
    underline.className = 'nav-underline';
    navList.prepend(underline);
  }

  const navLinks = document.querySelectorAll('.nav-link');
  let currentPath = window.location.pathname;
  if (currentPath.endsWith('/') || currentPath.endsWith('/index.html')) {
    currentPath = '/index.html';
  }
  const prevPath = sessionStorage.getItem('prevPath');

  let prevLink = null;
  let currentLink = null;
  navLinks.forEach(link => {
    let linkPath = new URL(link.href).pathname;
    if (linkPath.endsWith('/') || linkPath.endsWith('/index.html')) {
      linkPath = '/index.html';
    }
    if (linkPath === prevPath) {
      prevLink = link;
    }
    if (linkPath === currentPath) {
      currentLink = link;
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  sessionStorage.setItem('prevPath', currentPath);

  if (window.innerWidth >= 768) {
    if (!prevPath) {
      moveNavUnderline(currentLink, currentLink);
    } else {
      moveNavUnderline(prevLink || currentLink, currentLink);
    }
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      updateActiveLinkAndUnderline();
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      setTimeout(() => {
        const prevActive = document.querySelector('.nav-link.active');
        moveNavUnderline(prevActive, link);
      }, 0);
    });
  });
}