const debounce = (callback, delay = 100) => {
  let timeoutID;
  return (...args) => {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }

    timeoutID = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

module.exports = { debounce };
