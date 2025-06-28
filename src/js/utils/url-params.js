export const urlParamsUtils = {
  setNewParams: (params) => {
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    history.pushState(null, '', newUrl);
  },

  getParams: () => new URLSearchParams(window.location.search),

  getExerciseNameFromParams: (params) => {
    return params.get('bodypart') ?? params.get('muscles') ?? params.get('equipment') ?? null;
  }
};