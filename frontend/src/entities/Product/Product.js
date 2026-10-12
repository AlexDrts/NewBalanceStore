import { ProductVariant } from "./ProductVariant.js";

/**
 * Базовий клас доменної сутності товару на клієнтському боці.
 * Інкапсулює бізнес-правила перевірки доступності залишків, вибору головного фото
 * та розрахунку наявності знижки.
 */
export class Product {
    /** @type {number} Унікальний ідентифікатор товару */
    id;
    /** @type {string} Комерційна назва товару */
    name;
    /** @type {string} Детальний опис товару */
    description;
    /** @type {string} Тип виробу (Footwear / Clothing / Accessories) */
    type;
    /** @type {string} Категорія товару */
    category;
    /** @type {string} Призначення за активністю */
    activity;
    /** @type {string} Гендерна приналежність */
    gender;
    /** @type {number | null} Попередня ціна до знижки */
    oldPrice;
    /** @type {number} Поточна ціна товару */
    price;
    /** @type {Record<string, string[]>} Словник зображень за кольорами */
    images;
    /** @type {string[]} Список назв кольорів */
    colors;
    /** @type {boolean} Ознака нової колекції */
    isNew;
    /** @type {ProductVariant[]} Список складських варіацій */
    variants;

    /**
     * Створює екземпляр товару та ініціалізує його варіації екземплярами ProductVariant.
     * @param {Object} data - Об'єкт із властивостями товару.
     */
    constructor(data) {
        Object.assign(this, data);

        this.variants = (data.variants ?? []).map(
            variant => new ProductVariant(variant)
        );
    }

    /**
     * Повертає URL головного фото товару для вказаного кольору (або першого доступного).
     * @param {string | null} [color=null] - Назва кольору виробу.
     * @returns {string} Посилання на зображення.
     */
    getMainImage(color = null) {
        const imageColor = color ?? this.colors[0];
        return this.images[imageColor][0];
    }

    /**
     * Перевіряє, чи діє знижка на товар.
     * @returns {boolean} True, якщо встановлено стару ціну.
     */
    hasDiscount() {
        return this.oldPrice !== null;
    }

    /**
     * Знаходить конкретну складську варіацію за обраним кольором та розміром.
     * @param {string} color - Назва кольору.
     * @param {string | number} size - Розмір виробу.
     * @returns {ProductVariant | undefined} Знайдена варіація або undefined.
     */
    getVariant(color, size) {
        return this.variants.find(
            variant =>
                variant.color === color &&
                variant.size === size
        );
    }

    /**
     * Повертає доступний залишок на складі для заданої комбінації кольору та розміру.
     * @param {string} color - Колір виробу.
     * @param {string | number} size - Розмір виробу.
     * @returns {number} Кількість одиниць у наявності (0, якщо варіації немає).
     */
    getAvailableQuantity(color, size) {
        const variant = this.getVariant(color, size);
        return variant ? variant.quantity : 0;
    }

    /**
     * Перевіряє, чи є вказана варіація в наявності для замовлення.
     * @param {string} color - Колір виробу.
     * @param {string | number} size - Розмір виробу.
     * @returns {boolean} True, якщо залишок більший за 0.
     */
    isAvailable(color, size) {
        return this.getAvailableQuantity(color, size) > 0;
    }
}

