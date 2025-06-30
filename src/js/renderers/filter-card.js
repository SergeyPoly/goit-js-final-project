export const toLowerCaseFilter = (filter) =>
  filter === 'Body parts' ? 'bodypart' : filter.replace(/\s/g, '').toLowerCase();

export const renderFilterCard = (exercise) => {
  const { name, imgURL, filter } = exercise;

  return `
    <li class="exercises-content__item" data-filter="${toLowerCaseFilter(filter)}" data-exercise="${name.toLowerCase()}">
      <a href="#" class="exercises-content__link">
        <img
          src="${imgURL}"
          alt="Abs"
          class="exercises-content__image"
        />

        <div class="exercises-content__text">
          <h3 class="exercises-content__title">${name}</h3>
          <p class="exercises-content__description">${filter}</p>
        </div>
      </a>
    </li>
  `
}
