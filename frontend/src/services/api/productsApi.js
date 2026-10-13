import { apiRequest } from "./apiClient.js";

/**
 * Отримує повний список товарів із серверного каталогу.
 * @returns {Promise<Array<Object>>} Масив об'єктів товарів.
 */
export async function fetchProducts() {
    return apiRequest("/api/products");
}

/**
 * Отримує детальну інформацію про конкретний товар за його унікальним ID.
 * @param {string | number} id - Ідентифікатор товару.
 * @returns {Promise<Object>} Об'єкт товару з варіаціями та зображеннями.
 */
export async function fetchProduct(id) {
    return apiRequest(`/api/products/${id}`);
}

/**
 * Створює новий товар у каталозі (вимагає права адміністратора з дійсним JWT).
 * @param {Object} product - Дані нового товару.
 * @returns {Promise<Object>} Створений товар з присвоєним ID.
 */
export async function createProduct(product) {
    return apiRequest("/api/products", {
        method: "POST",
        body: JSON.stringify(product)
    });
}

/**
 * Оновлює параметри існуючого товару за його ідентифікатором (вимагає права адміністратора).
 * @param {string | number} id - Ідентифікатор товару.
 * @param {Object} product - Нові дані для оновлення.
 * @returns {Promise<void>}
 */
export async function updateProduct(id, product) {
    return apiRequest(`/api/products/${id}`, {
        method: "PUT",
        body: JSON.stringify(product)
    });
}

/**
 * Видаляє товар із каталогу за його ідентифікатором (вимагає права адміністратора).
 * @param {string | number} id - Ідентифікатор товару.
 * @returns {Promise<void>}
 */
export async function deleteProduct(id) {
    return apiRequest(`/api/products/${id}`, {
        method: "DELETE"
    });
}