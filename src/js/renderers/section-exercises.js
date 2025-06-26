import { getFilters, getExercises } from '../services/api';
import { renderFiltersList } from './filters-list'
import { toLowerCaseFilter } from './filter-card'
import { renderExercisesList } from './exercises-list';
import { renderPagination } from './pagination';
import { SECTION_EXERCISE_CONFIG } from '../constants';

// DOM Elements
const elements = {
  exercisesContent: document.querySelector('.exercises-content'),
  exercisesList: document.querySelector('.exercises-list-wrapper'),
  filterBlock: document.querySelector('.exercises-filter__filters'),
  filterBtns: document.querySelectorAll('.filter-btn'),
  filterUnderline: document.querySelector('.filter-underline'),
  exercisesTitle: document.querySelector('.exercises-header-wrapper .section-title'),
  breadcrumbs: document.querySelector('.exercises-header__breadcrumbs'),
  breadcrumbsText: document.querySelector('.breadcrumbs-exercises'),
  exercisesSearch: document.querySelector('.exercises-filter__search'),
  exercisesSearchInput: document.querySelector('.exercises-filter__search .search-input'),
  exercisesLoader: document.querySelector('.exercises-loader'),
  clearInputBtn: document.querySelector('.search-button.clear-icon'),
};

// Application State
const state = {
  currentFilter: null,
  currentPage: 1,
  currentLimit: 9,
  totalPages: null,
  exerciseName: null,
  exerciseSearch: '',
};

// Utility Functions
const urlUtils = {
  setNewParams: (params) => {
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    history.pushState(null, '', newUrl);
  },

  getParams: () => new URLSearchParams(window.location.search),

  getExerciseNameFromParams: (params) => {
    return params.get('bodypart') ?? params.get('muscles') ?? params.get('equipment') ?? null;
  }
};

const uiUtils = {
  showExercisesList: () => {
    elements.breadcrumbs.classList.remove('visually-hidden');
    elements.exercisesSearch.classList.remove('visually-hidden');
    elements.exercisesTitle.classList.add('cursor-pointer');
  },

  hideExercisesList: () => {
    elements.breadcrumbs.classList.add('visually-hidden');
    elements.exercisesSearch.classList.add('visually-hidden');
    elements.exercisesTitle.classList.remove('cursor-pointer');
  },

  updateBreadcrumbs: (text) => {
    elements.breadcrumbsText.textContent = text;
  },

  clearContent: () => {
    elements.exercisesContent.innerHTML = '';
    elements.exercisesList.innerHTML = '';
  },

  moveFilterUnderline: (targetBtn) => {
    const filterBlockRect = elements.filterBlock.getBoundingClientRect();
    const btnRect = targetBtn.getBoundingClientRect();
    
    const left = btnRect.left - filterBlockRect.left;
    const width = btnRect.width;

    elements.filterUnderline.style.left = `${left}px`;
    elements.filterUnderline.style.width = `${width}px`;
  },

  setActiveFilter: (activeBtn) => {
    elements.filterBtns.forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
    uiUtils.moveFilterUnderline(activeBtn);
  }
};

const responsiveUtils = {
  calculateLimit: (windowWidth, isExercisesList = false) => {
    if (isExercisesList) return SECTION_EXERCISE_CONFIG.LIMITS.EXERCISES_LIST;
    return windowWidth >= SECTION_EXERCISE_CONFIG.BREAKPOINTS.DESKTOP_LARGE 
      ? SECTION_EXERCISE_CONFIG.LIMITS.DESKTOP_LARGE 
      : SECTION_EXERCISE_CONFIG.LIMITS.DESKTOP;
  },

  updateLimit: (windowWidth = window.innerWidth) => {
    const newLimit = responsiveUtils.calculateLimit(windowWidth, !!state.exerciseName);
    if (state.currentLimit !== newLimit) {
      state.currentLimit = newLimit;
      if (state.exerciseName) {
        uiUtils.clearContent();
        renderExercises();
      } else {
        uiUtils.clearContent();
        renderFilters();
      }
      return true;
    }
    return false;
  }
};

// Core Functions
const clearPagination = () => {
  const paginationContainer = document.querySelector('.pagination');
  if (paginationContainer) {
    paginationContainer.remove();
  }
}

const renderFilters = async (page) => {
  try {
    elements.exercisesLoader.classList.remove('visually-hidden');
    state.currentPage = page ? page : state.currentPage;

    const { results, totalPages: totalPagesValue } = await getFilters(state.currentFilter, state.currentPage, state.currentLimit);

    const filtersList = renderFiltersList(results, 'Oops! No exercises found');

    elements.exercisesLoader.classList.add('visually-hidden');
    elements.exercisesContent.innerHTML = filtersList;
    state.totalPages = totalPagesValue;

    if (state.totalPages > 1) {
      renderPagination(state.currentPage, state.totalPages, newPage => {
        renderFilters(newPage);
      }, '.exercises-content-wrapper');
    } else {
      clearPagination();
    }
  } catch (error) {
    console.error('Error rendering filters:', error);
    elements.exercisesLoader.classList.add('visually-hidden');
    elements.exercisesContent.innerHTML = '<p class="content-error">Error loading filters.<br>Please try again.</p>';
  }
}

const renderExercises = async (page) => {
  try {
    elements.exercisesLoader.classList.remove('visually-hidden');
    state.currentPage = page ? page : state.currentPage;

    const { results, totalPages: totalPagesValue } = await getExercises(
      {[toLowerCaseFilter(state.currentFilter)]: state.exerciseName}, 
      state.exerciseSearch,
      state.currentPage, 
      state.currentLimit
    );


    renderExercisesList(results, 'Oops! No exercises found');

    elements.exercisesLoader.classList.add('visually-hidden');
    state.totalPages = totalPagesValue;

    if (state.totalPages > 1) {
      renderPagination(state.currentPage, state.totalPages, newPage => {
        renderExercises(newPage);
      }, '.exercises-content-wrapper');
    } else {
      clearPagination();
    }
  } catch (error) {
    console.error('Error rendering exercises:', error);
    elements.exercisesLoader.classList.add('visually-hidden');
    elements.exercisesList.innerHTML = '<p class="content-error">Error loading exercises.<br>Please try again.</p>';
  }
}

// Event Handlers
const handleFilterClick = async (e, btn) => {
  e.preventDefault();
  uiUtils.setActiveFilter(btn);
  
  state.currentFilter = btn.textContent;

  handleClearSearch();

  if (state.exerciseName) {
    uiUtils.hideExercisesList();
    state.exerciseName = null;
    uiUtils.clearContent();
  }

  state.currentPage = 1;

  await renderFilters();
};

const handleExerciseClick = async (e) => {
  const target = e.target.closest('.exercises-content__item');
  
  if (target) {
    state.exerciseName = target.dataset.exercise;
    const filter = target.dataset.filter;

    const params = new URLSearchParams();
    params.set('filter', state.currentFilter);
    params.set(filter, state.exerciseName);
    urlUtils.setNewParams(params);

    uiUtils.updateBreadcrumbs(state.exerciseName);
    uiUtils.showExercisesList();

    state.currentPage = 1;
    state.currentLimit = SECTION_EXERCISE_CONFIG.LIMITS.EXERCISES_LIST;

    uiUtils.clearContent();
    await renderExercises();
  }
};

const handleBackToFilters = async () => {
  uiUtils.hideExercisesList();

  handleClearSearch();

  state.currentPage = 1;
  state.exerciseName = null;
  responsiveUtils.updateLimit();

  uiUtils.clearContent();
  await renderFilters();
};

const handleWindowResize = () => {
  responsiveUtils.updateLimit();
};

const handleClearSearch = () => {
  elements.exercisesSearchInput.value = '';
  state.exerciseSearch = '';

  const params = new URLSearchParams();
  params.set('filter', state.currentFilter);
  if (state.exerciseName) {
    params.set(toLowerCaseFilter(state.currentFilter), state.exerciseName);
  }
  urlUtils.setNewParams(params);

  elements.clearInputBtn.classList.add('visually-hidden');
}

// Event Listeners
window.addEventListener('resize', handleWindowResize);

// Filter buttons click event
elements.filterBtns.forEach(btn => {
  btn.addEventListener('click', e => handleFilterClick(e, btn));
});

// Action to exercises list
elements.exercisesContent.addEventListener('click', handleExerciseClick);

// Back to filters list
elements.exercisesTitle.addEventListener('click', handleBackToFilters);

// Clear search input
elements.clearInputBtn.addEventListener('click', () => {
  handleClearSearch();
  renderExercises();
});

// Debounce utility for search input
const debounceUtils = {
  timers: new Map(),
  
  debounce: (func, delay, key = 'default') => {
    return (...args) => {
      if (debounceUtils.timers.has(key)) {
        clearTimeout(debounceUtils.timers.get(key));
      }
      
      const timerId = setTimeout(() => {
        func(...args);
        debounceUtils.timers.delete(key);
      }, delay);
      
      debounceUtils.timers.set(key, timerId);
    };
  }
};

// Debounced search function
const debouncedSearch = debounceUtils.debounce(async () => {
  if (state.exerciseName) {
    state.currentPage = 1;
    uiUtils.clearContent();
    await renderExercises();
  }
}, 500, 'search');

// Search input event
elements.exercisesSearchInput.addEventListener('input', e => {
  state.exerciseSearch = e.target.value.trim().toLowerCase();

  const params = new URLSearchParams();
  params.set('filter', state.currentFilter);

  if (state.exerciseName) {
    params.set(toLowerCaseFilter(state.currentFilter), state.exerciseName);
  }
  
  if (state.exerciseSearch) {
    params.set('keyword', state.exerciseSearch);
  }

  urlUtils.setNewParams(params);

  if (state.exerciseSearch === '') {
    elements.clearInputBtn.classList.add('visually-hidden');
  } else {
    elements.clearInputBtn.classList.remove('visually-hidden');
  }

  debouncedSearch();
});

const onLoad = () => {
  const params = urlUtils.getParams();
  state.currentFilter = params.get('filter') ?? SECTION_EXERCISE_CONFIG.DEFAULT_FILTER;
  state.exerciseName = urlUtils.getExerciseNameFromParams(params);
  state.exerciseSearch = params.get('keyword') ?? '';

  elements.exercisesSearchInput.value = state.exerciseSearch;

  if (state.exerciseSearch) {
    elements.clearInputBtn.classList.remove('visually-hidden');
  } else {
    elements.clearInputBtn.classList.add('visually-hidden');
  }
  
  let currentActiveBtn = null;

  for (const btn of elements.filterBtns) {
    if (btn.textContent.trim() === state.currentFilter) {
      currentActiveBtn = btn;
      btn.classList.add('active');
      break;
    } 
  }

  if (currentActiveBtn) uiUtils.moveFilterUnderline(currentActiveBtn);
  responsiveUtils.updateLimit();

  if (state.exerciseName) {
    uiUtils.updateBreadcrumbs(state.exerciseName);
    uiUtils.showExercisesList();
    state.currentLimit = SECTION_EXERCISE_CONFIG.LIMITS.EXERCISES_LIST;
    renderExercises();
    return;
  }
  
  renderFilters();
}

onLoad();