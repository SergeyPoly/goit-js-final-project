import { renderFilterCard } from './filter-card'

export const renderFiltersList = (exercises, emptyMessage) => {
  let content = '';

  if (!exercises.length) {
    content = `<p class="no-exercises-message">${emptyMessage}</p>`;
  } else {
    exercises.forEach(exercise => {
      content += renderFilterCard(exercise);
    });
  }

  return content;
}
