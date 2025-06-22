import axios from 'axios';
import iziToast from 'izitoast';
import { getIziToastOptions } from './izitoast.js';

const BASE_URL = 'https://your-energy.b.goit.study/api';

export async function getQuote() {
  try {
    const { data } = await axios.get(`${BASE_URL}/quote`);
    return data;
  } catch (e) {
    iziToast.show(getIziToastOptions({
      message: e.response?.data?.message || `An error occurred: ${e.message}, please try again later!`,
      isErrorType: true
    }));
    return undefined;
  }
}

export async function getFilters(filter, page = 1, limit = 12) {
  const params = {
    // Available values for filter: Body parts, Muscles, Equipment
    filter,
    page,
    limit
  };

  try {
    const { data } = await axios.get(`${BASE_URL}/filters`, { params });
    return data;
  } catch (e) {
    iziToast.show(getIziToastOptions({
      message: e.response?.data?.message || `An error occurred: ${e.message}, please try again later!`,
      isErrorType: true
    }));
    return undefined;
  }
}

export async function getExercises(filters, keyword, page = 1, limit = 10) {
  const { bodypart, muscles, equipment } = filters
  const params = {
    // Available values : back, cardio, chest, lower arms, lower legs, neck, shoulders, upper arms, upper legs, waist
    bodypart,
    // Available values : abductors, abs, adductors, biceps, calves, cardiovascular system, delts, forearms, glutes, hamstrings, lats, levator scapulae, pectorals, quads, serratus anterior, spine, traps, triceps, upper back
    muscles,
    // Available values : assisted, band, barbell, body weight, bosu ball, cable, dumbbell, elliptical machine, ez barbell, hammer, kettlebell, leverage machine, medicine ball, olympic barbell, resistance band, roller, rope, skierg machine, sled machine, smith machine, stability ball, stationary bike, stepmill machine, tire, trap bar, upper body ergometer, weighted, wheel roller
    equipment,
    keyword,
    page,
    limit
  };

  try {
    const { data } = await axios.get(`${BASE_URL}/exercises`, { params });
    return data;
  } catch (e) {
    iziToast.show(getIziToastOptions({
      message: e.response?.data?.message || `An error occurred: ${e.message}, please try again later!`,
      isErrorType: true
    }));
    return undefined;
  }
}

export async function getExercise(id) {
  try {
    const { data } = await axios.get(`${BASE_URL}/exercises/${id}`);
    return data;
  } catch (e) {
    iziToast.show(getIziToastOptions({
      message: e.response?.data?.message || `An error occurred: ${e.message}, please try again later!`,
      isErrorType: true
    }));
    return undefined;
  }
}

export async function postSubscription(email) {
  try {
    const { data } = await axios.post(`${BASE_URL}/subscription`, { email });
    iziToast.show(getIziToastOptions({
      message: data.message,
      isErrorType: false
    }));
  } catch (e) {
    iziToast.show(getIziToastOptions({
      message: e.response?.data?.message || `An error occurred: ${e.message}, please try again later!`,
      isErrorType: true
    }));
  }
}

export async function patchRating(id, rate, email, review) {
  try {
    const { data } = await axios.patch(`${BASE_URL}/exercises/${id}/rating`, { rate, email, review });
    iziToast.show(getIziToastOptions({
      message: 'Thank you for your feedback.',
      isErrorType: false
    }));
    return data;
  } catch (e) {
    iziToast.show(getIziToastOptions({
      message: e.response?.data?.message || `An error occurred: ${e.message}, please try again later!`,
      isErrorType: true
    }));
    return undefined;
  }
}

