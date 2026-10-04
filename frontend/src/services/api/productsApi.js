import { apiRequest } from "./apiClient.js";

export async function fetchProducts() {
    return apiRequest("/api/Products");
}

export async function fetchProduct(id) {
    return apiRequest(`/api/Products/${id}`);
}

export async function createProduct(product) {
    return apiRequest("/api/Products", {
        method: "POST",
        body: JSON.stringify(product)
    });
}

export async function updateProduct(id, product) {
    return apiRequest(`/api/Products/${id}`, {
        method: "PUT",
        body: JSON.stringify(product)
    });
}

export async function deleteProduct(id) {
    return apiRequest(`/api/Products/${id}`, {
        method: "DELETE"
    });
}