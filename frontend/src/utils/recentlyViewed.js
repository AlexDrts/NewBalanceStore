import { getStorage, setStorage } from "./localStorage.js";

const KEY = "recently_viewed";

export function addToRecentlyViewed(product) {
  let items = getStorage(KEY) || [];

  items = items.filter(id => id !== product.id);

  items.unshift(product.id);

  if (items.length > 5) {
    items = items.slice(0, 5);
  }

  setStorage(KEY, items, 7);
}

export function getRecentlyViewed() {
  return getStorage(KEY);
}
