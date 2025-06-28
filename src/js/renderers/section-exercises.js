import { getFilters, getExercises } from '../services/api';
import { renderFiltersList } from './filters-list'
import { toLowerCaseFilter } from './filter-card'
import { renderExercisesList } from './exercises-list';
import { clearPagination, renderPagination } from './pagination';
import { SECTION_EXERCISE_CONFIG } from '../constants';
import { urlParamsUtils } from '../utils/url-params';
import { debounceUtils } from '../utils/debounce';

const exercisesContainer = document.querySelector('.exercises > div.container');
const exercisesHeader = document.querySelector('.exercises-header');
const exercisesHeaderWrapper = exercisesHeader.querySelector('.exercises-header-wrapper');
const exercisesTitle = exercisesHeaderWrapper.querySelector('.section-title');
const breadcrumbs = exercisesHeaderWrapper.querySelector('.exercises-header__breadcrumbs');
const breadcrumbsText = breadcrumbs.querySelector('.breadcrumbs-exercises');

const exercisesFilter = document.querySelector('.exercises-filter');
const exercisesSearch = exercisesFilter.querySelector('.exercises-filter__search');
const exercisesSearchInput = exercisesSearch.querySelector('.search-input');
const clearInputBtn = exercisesSearch.querySelector('.search-button.clear-icon');

const filterBlock = exercisesFilter.querySelector('.exercises-filter__filters');
const filterBtns = filterBlock.querySelectorAll('.filter-btn');
const filterUnderline = filterBlock.querySelector('.filter-underline');

const exercisesContentWrapper = document.querySelector('.exercises-content-wrapper');
const exercisesContent = exercisesContentWrapper.querySelector('.exercises-content');
const exercisesList = exercisesContentWrapper.querySelector('.exercises-list-wrapper');
const exercisesLoader = exercisesContentWrapper.querySelector('.exercises-loader');

// Application State
const state = {
  windowView: null,
  currentFilter: null,
  currentPage: 1,
  currentLimit: 9,
  totalPages: null,
  exerciseName: null,
  exerciseSearch: '',
};

const uiUtils = {
  showExercisesList: () => {
    breadcrumbs.classList.remove('visually-hidden');
    exercisesSearch.classList.remove('visually-hidden');
    exercisesTitle.classList.add('cursor-pointer');
  },

  hideExercisesList: () => {
    breadcrumbs.classList.add('visually-hidden');
    exercisesSearch.classList.add('visually-hidden');
    exercisesTitle.classList.remove('cursor-pointer');
  },

  updateBreadcrumbs: (text) => {
    breadcrumbsText.textContent = text;
  },

  clearContent: () => {
    exercisesContent.innerHTML = '';
    exercisesList.innerHTML = '';
  },

  moveFilterUnderline: (targetBtn) => {
    const filterBlockRect = filterBlock.getBoundingClientRect();
    const btnRect = targetBtn.getBoundingClientRect();

    const left = btnRect.left - filterBlockRect.left;
    const width = btnRect.width;

    filterUnderline.style.left = `${left}px`;
    filterUnderline.style.width = `${width}px`;
  },

  setActiveFilter: (activeBtn) => {
    filterBtns.forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
    uiUtils.moveFilterUnderline(activeBtn);
  },
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
  },

  currentWindowView: (windowWidth = window.innerWidth) => {
    const { DESKTOP_LARGE, TABLET } = SECTION_EXERCISE_CONFIG.BREAKPOINTS;

    let newView;
    if (windowWidth >= DESKTOP_LARGE) {
      newView = 'desktop';
    } else if (windowWidth >= TABLET) {
      newView = 'tablet';
    } else {
      newView = 'mobile';
    }

    return newView;
  },

  updateUnderlinePosition: () => {
    const newView = responsiveUtils.currentWindowView();
    if (newView === state.windowView) return;

    state.windowView = newView;

    setTimeout(() => {
      const activeBtn = filterBlock.querySelector('.filter-btn.active');
      if (activeBtn) {
        uiUtils.moveFilterUnderline(activeBtn);
      }
    }, 50);
  }
};

// Core Functions
const scrollToTopOfContent = () => {
  exercisesContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const renderFilters = async (page) => {
  state.currentPage = page ?? state.currentPage;

  const { results, totalPages: totalPagesValue } = await getFilters(state.currentFilter, state.currentPage, state.currentLimit);

  const filtersList = renderFiltersList(results, 'Oops! No exercises found');

  exercisesLoader.classList.add('visually-hidden');
  exercisesContent.innerHTML = filtersList;
  state.totalPages = totalPagesValue;

  if (state.totalPages > 1) {
    renderPagination(state.currentPage, state.totalPages, newPage => {
      scrollToTopOfContent();
      renderFilters(newPage);
    }, '.exercises-content-wrapper');
  } else {
    clearPagination();
  }
}

const renderExercises = async (page) => {
  state.currentPage = page ?? state.currentPage;

  const { results, totalPages: totalPagesValue } = await getExercises(
    {[toLowerCaseFilter(state.currentFilter)]: state.exerciseName},
    state.exerciseSearch,
    state.currentPage,
    state.currentLimit
  );

  uiUtils.clearContent();
  renderExercisesList(results, 'Oops! No exercises found');

  exercisesLoader.classList.add('visually-hidden');

  state.totalPages = totalPagesValue;

  if (state.totalPages > 1) {
    renderPagination(state.currentPage, state.totalPages, newPage => {
      scrollToTopOfContent();
      renderExercises(newPage);
    }, '.exercises-content-wrapper');
  } else {
    clearPagination();
  }
}

// Event Handlers
const handleFilterClick = async (e, btn) => {
  e.preventDefault();
  uiUtils.setActiveFilter(btn);

  state.currentFilter = btn.textContent;

  if (state.exerciseName) {
    exercisesLoader.classList.remove('visually-hidden');
    clearPagination();

    uiUtils.hideExercisesList();
    state.exerciseName = null;
    uiUtils.clearContent();
  }

  handleClearSearch();

  state.currentPage = 1;

  await renderFilters();
};

const handleExerciseClick = (e) => {
  const target = e.target.closest('.exercises-content__item');

  if (target) {
    scrollToTopOfContent();
    state.exerciseName = target.dataset.exercise;
    const filter = target.dataset.filter;

    const params = new URLSearchParams();
    params.set('filter', state.currentFilter);
    params.set(filter, state.exerciseName);
    urlParamsUtils.setNewParams(params);

    uiUtils.updateBreadcrumbs(state.exerciseName);
    uiUtils.showExercisesList();

    state.currentPage = 1;
    state.currentLimit = SECTION_EXERCISE_CONFIG.LIMITS.EXERCISES_LIST;

    clearPagination();

    renderExercises();
  }
};

const handleBackToFilters = () => {
  scrollToTopOfContent();
  uiUtils.hideExercisesList();

  handleClearSearch();

  state.currentPage = 1;
  state.exerciseName = null;
  responsiveUtils.updateLimit();

  uiUtils.clearContent();
  renderFilters();
};

const handleWindowResize = () => {
  responsiveUtils.updateLimit();
  responsiveUtils.updateUnderlinePosition();
};

const handleClearSearch = () => {
  exercisesSearchInput.value = '';
  state.exerciseSearch = '';

  const params = new URLSearchParams();
  params.set('filter', state.currentFilter);
  if (state.exerciseName) {
    params.set(toLowerCaseFilter(state.currentFilter), state.exerciseName);
  }
  urlParamsUtils.setNewParams(params);

  clearInputBtn.classList.add('visually-hidden');
}

// Event Listeners
window.addEventListener('resize', handleWindowResize);

// Filter buttons click event
filterBtns.forEach(btn => {
  btn.addEventListener('click', e => handleFilterClick(e, btn));
});

// Action to exercises list
exercisesContent.addEventListener('click', handleExerciseClick);

// Back to filters list
exercisesTitle.addEventListener('click', handleBackToFilters);

// Clear search input
clearInputBtn.addEventListener('click', () => {
  handleClearSearch();
  renderExercises();
});

// Debounced search function
const debouncedSearch = debounceUtils.debounce(async () => {
  if (state.exerciseName) {
    state.currentPage = 1;
    uiUtils.clearContent();
    await renderExercises();
  }
}, 750, 'search');

// Search input event
exercisesSearchInput.addEventListener('input', e => {
  state.exerciseSearch = e.target.value.trim().toLowerCase();

  const params = new URLSearchParams();
  params.set('filter', state.currentFilter);

  if (state.exerciseName) {
    params.set(toLowerCaseFilter(state.currentFilter), state.exerciseName);
  }

  if (state.exerciseSearch) {
    params.set('keyword', state.exerciseSearch);
  }

  urlParamsUtils.setNewParams(params);

  if (state.exerciseSearch === '') {
    clearInputBtn.classList.add('visually-hidden');
  } else {
    clearInputBtn.classList.remove('visually-hidden');
  }

  debouncedSearch();
});

const onLoad = () => {
  const params = urlParamsUtils.getParams();
  state.currentFilter = params.get('filter') ?? SECTION_EXERCISE_CONFIG.DEFAULT_FILTER;
  state.exerciseName = urlParamsUtils.getExerciseNameFromParams(params);
  state.exerciseSearch = params.get('keyword') ?? '';

  exercisesSearchInput.value = state.exerciseSearch;

  if (state.exerciseSearch) {
    clearInputBtn.classList.remove('visually-hidden');
  } else {
    clearInputBtn.classList.add('visually-hidden');
  }

  let currentActiveBtn = null;

  for (const btn of filterBtns) {
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