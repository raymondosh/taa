/*
 * localstorage helpers
 * ttl is the number of seconds the item should remain in local storage,
 * defaults to 3600 * 2 (2 hrs)
 * */
window.setItem = (key, value, ttl = 3600 * 2) => {
  const now = new Date();
  const item = {
    value,
    expiry: now.getTime() + ttl * 1000,
  };
  window.localStorage.setItem(key, JSON.stringify(item));
};

window.getItem = (key) => {
  try {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
      window.localStorage.removeItem(key);
      return null;
    }
    return item.value;
  } catch (e) {
    window.localStorage.clear();
  }
};

window.pullItem = (key) => {
  try {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
      window.localStorage.removeItem(key);
      return null;
    }
    window.localStorage.removeItem(key);
    return item.value;
  } catch (e) {
    window.localStorage.clear();
  }
};

window.removeItem = (key) => {
  try {
    window.localStorage.removeItem(key);
  } catch (e) {
    window.localStorage.clear();
  }
};
