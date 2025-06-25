export function renderPagination(currentPage, totalPages, onPageChange, contentBlock = '.favorites-content') {
  let paginationContainer = document.querySelector('.pagination');

  if (!paginationContainer) {
    paginationContainer = document.createElement('div');
    paginationContainer.className = 'pagination';
    document
      .querySelector(contentBlock)
      .appendChild(paginationContainer);
  } else {
    paginationContainer.innerHTML = ''; // Clear previous pagination
  }

  let paginationHTML = '';

  for (let page = 0; page < totalPages; page += 1) {
    paginationHTML += `<button class="page-button ${
      page === currentPage ? 'active' : ''
    }" data-page="${page}">${page + 1}</button>`;
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
