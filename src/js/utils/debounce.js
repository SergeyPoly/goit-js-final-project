export const debounceUtils = {
  timers: new Map(),
  
  debounce: (func, delay, key = 'default') => {
    return (...args) => {
      if (debounceUtils.timers.has(key)) {
        clearTimeout(debounceUtils.timers.get(key));
      }
      
      const timerId = setTimeout(() => {
        func(...args);
        debounceUtils.timers.delete(key);
      }, delay);
      
      debounceUtils.timers.set(key, timerId);
    };
  }
};