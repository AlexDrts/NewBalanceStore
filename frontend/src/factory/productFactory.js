import { Shoe } from "../entities/Product/Shoe.js";
import { Clothing } from "../entities/Product/Clothing.js";
import { Accessory } from "../entities/Product/Accessory.js";
import { Product } from "../entities/Product/Product.js";

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