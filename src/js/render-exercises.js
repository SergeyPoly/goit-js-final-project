import { getFilters, getExercises } from './api.js';

window.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname === '/') {
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

  const toLowerCaseFilter = (filter) => {
    return filter !== 'Body parts'? filter.replace(/\s/g, '').toLowerCase() : 'bodypart';
  }

  const renderFilters = async (contentType = 'filter') => {
    exercisesLoader.classList.remove('visually-hidden');
    
    if (contentType === 'filter') {
      const { results, totalPages: totalPagesValue } = await getFilters(currentFilter, currentPage, currentLimit);
      // await new Promise(resolve => setTimeout(resolve, 100000));

      if (!results || results.length === 0) {
        return;
      }

      const exercisesElements = results.map(exercise => {
        const { name, imgURL, filter } = exercise;

        return `
          <li class="exercises-content__item" data-filter="${toLowerCaseFilter(filter)}" data-exercise="${name.toLowerCase()}">
            <img
              src="${imgURL}"
              alt="Abs"
              class="exercises-content__image"
            />

            <div class="exercises-content__text">
              <h3 class="exercises-content__title">${name}</h3>
              <p class="exercises-content__description">${filter}</p>
            </div>
          </li>
        `
      });

      exercisesLoader.classList.add('visually-hidden');
      exercisesContent.innerHTML = exercisesElements.join('');
      totalPages = totalPagesValue;
    }

    if (contentType === 'exercises') {
      const { results, totalPages: totalPagesValue } = await getExercises(currentFilter, currentPage, currentLimit);
      // await new Promise(resolve => setTimeout(resolve, 100000));

      if (!results || results.length === 0) {
        return;
      }

      const exercisesElements = results.map(exercise => {
        const { name, imgURL, filter } = exercise;

        return `
          <li class="exercises-content__item" data-filter="${toLowerCaseFilter(filter)}" data-exercise="${name.toLowerCase()}">
            <img
              src="${imgURL}"
              alt="Abs"
              class="exercises-content__image"
            />

            <div class="exercises-content__text">
              <h3 class="exercises-content__title">${name}</h3>
              <p class="exercises-content__description">${filter}</p>
            </div>
          </li>
        `
      });

      exercisesLoader.classList.add('visually-hidden');
      exercisesContent.innerHTML = exercisesElements.join('');
      totalPages = totalPagesValue;
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
  window.addEventListener('resize', onWindowResize);

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
    }
  });

  exercisesTitle.addEventListener('click', () => {
    breadcrumbs.classList.add('visually-hidden');
    exercisesSearch.classList.add('visually-hidden');

    const params = new URLSearchParams();
    params.set('filter', currentFilter);

    setNewURLParams(params);
    exerciseName = null;
    renderFilters();
  });
}});
