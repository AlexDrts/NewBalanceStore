import { Shoe } from "../entities/Product/Shoe.jsx";
import { Clothing } from "../entities/Product/Clothing.jsx";
import { Accessory } from "../entities/Product/Accessory.jsx";
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