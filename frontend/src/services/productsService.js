import { createProduct } from "../factory/productFactory.js";
import { getStoredProducts } from "./localStorageService.js";

export async function getProducts() {
    const response = await fetch("/data/products.json");

    if (!response.ok) {
        throw new Error("Failed to load products");
    }
    const data = await response.json();
    const storedProducts = getStoredProducts();

    const allProducts = [
        ...data,
        ...storedProducts,
    ];

    return allProducts.map(createProduct);
}