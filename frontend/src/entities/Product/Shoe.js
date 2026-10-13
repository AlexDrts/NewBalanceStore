import { Product } from './Product.js';

/**
 * Спеціалізована доменна сутність взуття (Footwear).
 * Успадковує базовий клас Product та реалізує специфічні методи перевірки категорії.
 */
export class Shoe extends Product {
    /**
     * Створює екземпляр взуття на основі вхідних властивостей.
     * @param {Object} data - Дані товару.
     */
    constructor(data) {
        super(data);
    }

    /**
     * Перевіряє належність до категорії взуття.
     * @returns {boolean} Завжди true для екземплярів Shoe.
     */
    isFootwear() {
        return true;
    }
}