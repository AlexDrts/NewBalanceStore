import { Product } from "./Product";

/**
 * Спеціалізована доменна сутність аксесуарів (Accessories).
 */
export class Accessory extends Product {
    /**
     * Створює екземпляр аксесуара на основі вхідних властивостей.
     * @param {Object} data - Дані товару.
     */
    constructor(data) {
        super(data);
    }

    /**
     * Перевіряє належність до категорії аксесуарів.
     * @returns {boolean} Завжди true для екземплярів Accessory.
     */
    isAccessory() {
        return true;
    }
}
}