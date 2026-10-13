import { Product } from "./Product";

/**
 * Спеціалізована доменна сутність одягу (Clothing).
 */
export class Clothing extends Product {
    /**
     * Створює екземпляр одягу на основі вхідних властивостей.
     * @param {Object} data - Дані товару.
     */
    constructor(data) {
        super(data);
    }

    /**
     * Перевіряє належність до категорії одягу.
     * @returns {boolean} Завжди true для екземплярів Clothing.
     */
    isClothing() {
        return true;
    }
}