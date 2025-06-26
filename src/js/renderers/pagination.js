import { getIconPath } from '../utils/get-icon-path';

const MAX_PAGES = 3;

function renderEllipsis() {
  return `<span class="pagination-ellipsis">...</span>`;
}

function renderPageButton(page, currentPage) {
  return `<button class="page-button ${
    page === currentPage ? 'active' : ''
  }" data-page="${page}">${page}</button>`;
}

function renderArrowButton(direction, double, page, disabled) {
  return `<button class="page-button arrow ${
    disabled ? 'disabled' : ''
  }" data-page="${page}">
    <svg class="pagination-arrow-icon ${double ? 'double' : ''}">
      <use href="${getIconPath(
        `pagination-arrow${double ? '-double' : ''}-${direction}-icon`
      )}"></use>
    </svg>
  </button>`;
}

export function renderPagination(currentPage, totalPages, onPageChange) {
  let paginationContainer = document.querySelector('.pagination');

  if (!paginationContainer) {
    paginationContainer = document.createElement('div');
    paginationContainer.className = 'pagination';
    document.querySelector('.exercises-list').appendChild(paginationContainer);
  } else {
    paginationContainer.innerHTML = ''; // Clear previous pagination
  }

  let paginationHTML = '';

  const startPage = Math.max(1, currentPage - Math.floor(MAX_PAGES / 2));
  const endPage = Math.min(totalPages, startPage + MAX_PAGES - 1);
  const adjustedStartPage = Math.max(1, endPage - MAX_PAGES + 1);

  const exceedsMaxPages = totalPages > MAX_PAGES;

  if (exceedsMaxPages) {
    const prevDisabled = currentPage === 1;

    paginationHTML += `
      <div class="arrow-buttons">
        ${renderArrowButton('left', true, 1, prevDisabled)}
        ${renderArrowButton('left', false, currentPage - 1, prevDisabled)}
      </div>
    `;
  }

  let pageButtonsHTML = '';
  for (let page = adjustedStartPage; page <= endPage; page += 1) {
    pageButtonsHTML += renderPageButton(page, currentPage);
  }

  const shouldAddStartEllipsis = adjustedStartPage > 1;
  const shouldAddEndEllipsis = endPage < totalPages;

  if (shouldAddStartEllipsis) {
    pageButtonsHTML = `${renderEllipsis()}${pageButtonsHTML}`;
  }
  if (shouldAddEndEllipsis) {
    pageButtonsHTML += renderEllipsis();
  }

  paginationHTML += `<div class="page-buttons">${pageButtonsHTML}</div>`;

  if (exceedsMaxPages) {
    const nextDisabled = currentPage === totalPages;

    paginationHTML += `
      <div class="arrow-buttons">
        ${renderArrowButton('right', false, currentPage + 1, nextDisabled)}
        ${renderArrowButton('right', true, totalPages, nextDisabled)}
      </div>
    `;
  }

  paginationContainer.insertAdjacentHTML('beforeend', paginationHTML);

  paginationContainer.onclick = e => {
    const target =
      e.target.nodeName === 'BUTTON'
        ? e.target
        : e.target.closest('.pagination button');

    if (target) {
      const page = parseInt(target.dataset.page, 10);

      if (page !== currentPage) {
        onPageChange(page);
      }
    }
  };
}
