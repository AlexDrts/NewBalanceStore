import { Shoe } from "../entities/Product/Shoe.js";
import { Clothing } from "../entities/Product/Clothing.js";
import { Accessory } from "../entities/Product/Accessory.js";
import { Product } from "../entities/Product/Product.js";

/**
 * Фабрична функція (Factory Method) для створення екземплярів доменних сутностей товарів
 * відповідно до їхнього типу, отриманого від бекенд API.
 *
 * @param {Object} data - Необроблені дані товару з API або сховища.
 * @param {string} data.type - Тип виробу ("Footwear", "Clothing", "Accessories").
 * @returns {Shoe | Clothing | Accessory | Product} Конкретний типізований екземпляр продукту з доменною поведінкою.
 */
export function createProduct(data) {
    switch (data.type) {
        case "Footwear":
            return new Shoe(data);

        case "Clothing":
            return new Clothing(data);

        case "Accessories":
            return new Accessory(data);

        default:
            return new Product(data);
    }
}
}