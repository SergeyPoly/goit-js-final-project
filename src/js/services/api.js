import axios from 'axios';

import { showErrorMessage, showSuccessMessage } from './izitoast.js';
import { EXERCISES_PAGE_SIZE } from '../constants.js';

axios.defaults.baseURL = 'https://your-energy.b.goit.study/api';

function handleApiError(e) {
  showErrorMessage(
    e.response?.data?.message ||
      `An error occurred: ${e.message}, please try again later!`
  );
}

async function makeRequest(method, ...args) {
  try {
    const { data } = await axios[method](...args);
    return data;
  } catch (e) {
    handleApiError(e);
    return null;
  }
}

export function getQuote() {
  return makeRequest('get', '/quote');
}

export function getFilters(filter, page = 1, limit = 12) {
  const params = {
    // Available values for filter: Body parts, Muscles, Equipment
    filter,
    page,
    limit,
  };

  return makeRequest('get', '/filters', { params });
}

export function getExercises(
  filters,
  keyword,
  page = 1,
  limit = EXERCISES_PAGE_SIZE
) {
  const { bodypart, muscles, equipment } = filters;
  const params = {
    // Available values : back, cardio, chest, lower arms, lower legs, neck, shoulders, upper arms, upper legs, waist
    bodypart,
    // Available values : abductors, abs, adductors, biceps, calves, cardiovascular system, delts, forearms, glutes, hamstrings, lats, levator scapulae, pectorals, quads, serratus anterior, spine, traps, triceps, upper back
    muscles,
    // Available values : assisted, band, barbell, body weight, bosu ball, cable, dumbbell, elliptical machine, ez barbell, hammer, kettlebell, leverage machine, medicine ball, olympic barbell, resistance band, roller, rope, skierg machine, sled machine, smith machine, stability ball, stationary bike, stepmill machine, tire, trap bar, upper body ergometer, weighted, wheel roller
    equipment,
    keyword,
    page,
    limit,
  };

  return makeRequest('get', '/exercises', { params });
}

export function getExercise(id) {
  return makeRequest('get', `/exercises/${id}`);
}

export async function postSubscription(email) {
  const data = await makeRequest('post', '/subscription', { email });

  if (data) {
    showSuccessMessage(data?.message || 'Thank you for your subscription!');
  }
  return data;
}

export async function patchRating(id, rate, email, review) {
  const data = await makeRequest('patch', `/exercises/${id}/rating`, {
    rate,
    email,
    review,
  });

  if (data) {
    showSuccessMessage('Thank you for your feedback!');
  }

  return data;
}
