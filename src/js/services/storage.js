const LOCAL_STORAGE_KEY = 'favoriteExercises';

/**
 * Exercise example:
 * "_id": "64f389465ae26083f39b17a5",
    "bodyPart": "waist",
    "equipment": "body weight",
    "gifUrl": "https://ftp.goit.study/img/power-pulse/gifs/0006.gif",
    "name": "alternate heel touchers",
    "target": "abs",
    "description": "This refers to your core muscles, which include the rectus abdominis, obliques, and transverse abdominis. They're essential for maintaining posture, stability, and generating force in many movements. Exercises that target the abs include crunches, leg raises, and planks.",
    "rating": 3,
    "burnedCalories": 116,
    "time": 3,
    "popularity": 1
 */

export function storeExercise(exercise) {
  const exercises = getStoredExercises();

  if (exercises.some(e => e._id === exercise._id)) {
    return;
  }
  exercises.push(exercise);

  storeExercises(exercises);
}

export function removeStoredExercise(exerciseId) {
  const exercises = getStoredExercises();

  const updatedExercises = exercises.filter(e => e._id !== exerciseId);

  storeExercises(updatedExercises);
}

function storeExercises(exercises) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(exercises));
}

export function getStoredExercises() {
  try {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (storedData) {
      const parsedExercises = JSON.parse(storedData);

      if (Array.isArray(parsedExercises)) {
        return parsedExercises.filter(validateExercise);
      }
    }
  } catch (error) {
    // no need to handle error here, just return an empty array
  }
  return [];
}

export function sendRating(ratingData) {

}

function validateExercise(exercise) {
  return (
    exercise &&
    typeof exercise === 'object' &&
    typeof exercise._id === 'string' &&
    typeof exercise.name === 'string'
  );
}
