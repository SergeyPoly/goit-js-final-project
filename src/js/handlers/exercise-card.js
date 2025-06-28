import { removeStoredExercise, storeExercise } from '../services/storage';
import { getExercise } from '../services/api';
import { createExerciseModal } from '../renderers/exercise-modal';
import { createRatingModal } from '../renderers/rating-modal';
import { emitEvent } from '../services/events';
import { EVENTS } from '../constants';

export function handleRemoveFavorite(exerciseId) {
  removeStoredExercise(exerciseId);
  emitEvent(EVENTS.FAVORITE_REMOVED, exerciseId);
}

export function handleAddFavorite(exercise) {
  storeExercise(exercise);
  emitEvent(EVENTS.FAVORITE_ADDED, exercise);
}

export function handleRate(exerciseId) {
  createRatingModal(exerciseId);
}

export async function handleStart(exerciseId) {
  const data = await getExercise(exerciseId);
  createExerciseModal(data);
}
