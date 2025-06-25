import { getFilters, getExercises } from '../services/api';
import { renderFiltersList } from './filters-list'
import { renderPagination } from './pagination';
import { toggleHideDOMElement } from './utils';

const exercisesContent = document.querySelector('.exercises-content');

const filterBlock = document.querySelector('.exercises-filter__filters');
const filterBtns = filterBlock.querySelectorAll('.filter-btn');
const filterUnderline = filterBlock.querySelector('.filter-underline');

const exercisesTitle = document.querySelector('.exercises-header-wrapper .section-title');
const breadcrumbs = document.querySelector('.exercises-header__breadcrumbs');
const breadcrumbsText = breadcrumbs.querySelector('.breadcrumbs-exercises');
const exercisesSearch = document.querySelector('.exercises-filter__search');

const exercisesLoader = exercisesContent.querySelector('.exercises-loader');

let currentFilter = null;
let currentPage = 1;
let currentLimit = 9;
let totalPages = null;
let exerciseName = null;

const setNewURLParams = (params) => {
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  history.pushState(null, '', newUrl);
}

const moveUnderline = (link) => {
  const filterBlockRect = filterBlock.getBoundingClientRect();
  const linkRect = link.getBoundingClientRect();
  
  const left = linkRect.left - filterBlockRect.left;
  const width = linkRect.width;

  filterUnderline.style.left = `${left}px`;
  filterUnderline.style.width = `${width}px`;
}

const renderFilters = async (page) => {
  toggleHideDOMElement(exercisesLoader);
  currentPage = page ? page : currentPage;

  const { results, totalPages: totalPagesValue } = await getFilters(currentFilter, currentPage, currentLimit);

  const filtersList = renderFiltersList(results, 'Oops! No exercises found');

  toggleHideDOMElement(exercisesLoader);
  exercisesContent.innerHTML = filtersList;
  totalPages = totalPagesValue;

  if (totalPages > 1) {
    renderPagination(currentPage - 1, totalPages, newPage => {
      page = newPage;
      renderFilters(newPage + 1);
    }, '.exercises-content-wrapper');
  }
}

const onWindowResize = (e) => {
  const targetElement = e ? e.target : window;
  if (targetElement.innerWidth >= 1440 && currentLimit !== 12) {
    currentLimit = 12;
  }

  if (targetElement.innerWidth < 1440 && currentLimit !== 9) {
    currentLimit = 9;
  }
}

window.addEventListener('resize', onWindowResize);

// Filter buttons click event
filterBtns.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    filterBtns.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    moveUnderline(link);
    currentFilter = link.textContent;

    const params = new URLSearchParams();
    params.set('filter', currentFilter);

    setNewURLParams(params);

    renderFilters();
  });
});

// Action to exercise list
exercisesContent.addEventListener('click', e => {
  const target = e.target.closest('.exercises-content__item');
  if (target) {
    exerciseName = target.dataset.exercise;
    const filter = target.dataset.filter;

    const params = new URLSearchParams();
    params.set('filter', currentFilter);
    params.set(filter, exerciseName);

    setNewURLParams(params);

    breadcrumbsText.textContent = exerciseName;
    breadcrumbs.classList.remove('visually-hidden');
    exercisesSearch.classList.remove('visually-hidden');
    exercisesTitle.classList.add('cursor-pointer');
  }
});

// Back to filters
exercisesTitle.addEventListener('click', () => {
  breadcrumbs.classList.add('visually-hidden');
  exercisesSearch.classList.add('visually-hidden');
  exercisesTitle.classList.remove('cursor-pointer');

  const params = new URLSearchParams();
  params.set('filter', currentFilter);

  setNewURLParams(params);
  exerciseName = null;
  renderFilters();
});

const onLoad = () => {
  const params = new URLSearchParams(window.location.search);
  currentFilter = params.get('filter') || 'Muscles';
  let currentActiveBtn = null;

  for (const btn of filterBtns) {
    if (btn.textContent.trim() === currentFilter) {
      currentActiveBtn = btn;
      btn.classList.add('active');
      break;
    } 
  }

  if (currentActiveBtn) moveUnderline(currentActiveBtn);
  onWindowResize();
  renderFilters();
}

onLoad();