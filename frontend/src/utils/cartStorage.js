import { getStorage, setStorage  } from "./localStorage.js";

const CART_KEY = "cart";

export function getCart() {
  return getStorage(CART_KEY) || [];
}

export function saveCart(cart) {
  setStorage(CART_KEY, cart);
}

export function clearCart() {
  localStorage.removeItem(CART_KEY);
}