const initApp = () => {
  const button = document.querySelector("button");
  button.addEventListener("click", throttle(handleOrder, 3000));
};

const handleOrder = () => {
  console.log("Run");
};

const debounce = (fn, delay) => {
  delay = delay || 0;
  let timeId;

  return () => {
    console.log("Debounce");
    if (timeId) {
      clearTimeout(timeId);
      timeId = null;
    }
    timeId = setTimeout(() => {
      fn();
    }, delay);
  };
};

const throttle = (fn, delay) => {
  delay = delay || 0;
  let last = 0;
  console.log("hello");
  return () => {
    const now = new Date().getTime();
    console.log(now, last);
    if (now - last < delay) {
      return;
    }
    last = now;
    fn();
  };
};

document.addEventListener("DOMContentLoaded", initApp);
