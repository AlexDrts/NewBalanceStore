import { createProduct } from "../factory/productFactory.js";
import { fetchProducts } from "./api/productsApi.js";

export async function getProducts() {
    const data = await fetchProducts();

    return data.map(createProduct);
}