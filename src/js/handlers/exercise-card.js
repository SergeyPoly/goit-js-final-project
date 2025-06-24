import { EXERCISE_CARD_ACTIONS } from '../constants';
import { removeExerciseCard } from '../renderers/exercise-card';
import { removeStoredExercise } from '../services/storage';

function handleRemoveFavorite(listEl, exerciseId) {
  removeStoredExercise(exerciseId);
  removeExerciseCard(listEl, exerciseId);
}

function handleRate(exerciseId) {
  // TODO: to implement
  console.log(`Rating exercise: ${exerciseId}`);
}

function handleStart(exerciseId) {
  // TODO: to implement
  console.log(`Starting exercise: ${exerciseId}`);
}

export function handleExerciseCardAction(listEl, exerciseId, action) {
  switch (action) {
    case EXERCISE_CARD_ACTIONS.REMOVE_FAVORITE:
      handleRemoveFavorite(listEl, exerciseId);
      break;

    case EXERCISE_CARD_ACTIONS.START:
      handleStart(exerciseId);
      break;

    case EXERCISE_CARD_ACTIONS.RATE:
      handleRate(exerciseId);
      break;

    default:
      console.warn('Unknown action:', action);
  }
}
