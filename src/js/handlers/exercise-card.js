import { removeExerciseCard } from '../renderers/exercise-card';
import { removeStoredExercise } from '../services/storage';

export function handleRemoveFavorite(listEl, exerciseId) {
  removeStoredExercise(exerciseId);
  removeExerciseCard(listEl, exerciseId);
}

export function handleRate(exerciseId) {
  // TODO: to implement
  console.log(`Rating exercise: ${exerciseId}`);
}

export function handleStart(exerciseId) {
  // TODO: to implement
  console.log(`Starting exercise: ${exerciseId}`);
}
