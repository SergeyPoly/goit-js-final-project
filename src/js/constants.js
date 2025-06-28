export const EXERCISE_CARD_CLASS_NAME = 'exercise-card';

export const EXERCISES_PAGE_SIZE = 10;

export const EXERCISE_ACTIONS = Object.freeze({
  START: 'start',
  RATE: 'rate',
  REMOVE_FAVORITE: 'removeFavorite',
  ADD_FAVORITE: 'addFavorite',
});

export const SECTION_EXERCISE_CONFIG = Object.freeze({
  LIMITS: {
    DESKTOP_LARGE: 12,
    DESKTOP: 9,
    EXERCISES_LIST: 10
  },
  BREAKPOINTS: {
    DESKTOP_LARGE: 1440,
    TABLET: 768,
  },
  DEFAULT_FILTER: 'Muscles'
});

export const EVENTS = Object.freeze({
  FAVORITE_REMOVED: 'favorite-removed',
  FAVORITE_ADDED: 'favorite-added',
});