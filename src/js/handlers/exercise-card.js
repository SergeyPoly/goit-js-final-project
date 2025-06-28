import { removeExerciseCard } from '../renderers/exercise-card';
import { removeStoredExercise } from '../services/storage';
import { getExercise } from '../services/api';
import { createExerciseModal } from '../renderers/exercise-modal';
import { createRatingModal } from '../renderers/rating-modal.js';

export function handleRemoveFavorite(listEl, exerciseId) {
  removeStoredExercise(exerciseId);
  removeExerciseCard(listEl, exerciseId);
}

export function handleRate(exerciseId) {
  // TODO: to implement
  createRatingModal(exerciseId);

  console.log(`Rating exercise: ${exerciseId}`);
}

export async function handleStart(exerciseId) {
  const data = await getExercise(exerciseId);
  createExerciseModal(data);
}
