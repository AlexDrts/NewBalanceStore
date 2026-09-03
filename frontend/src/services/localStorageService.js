const PRODUCTS_KEY = "adminProducts";

export function getStoredProducts() {
    const storedProducts = localStorage.getItem(PRODUCTS_KEY);

    if (!storedProducts) {
        return [];
    }

    return JSON.parse(storedProducts);
}

export function saveProduct(product) {
    const products = getStoredProducts();

    products.push(product);

    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

export function removeProduct(productId) {
    const products = getStoredProducts();

    const updatedProducts = products.filter(
        product => product.id !== productId
    );

    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updatedProducts));
}

export function clearStoredProducts() {
    localStorage.removeItem(PRODUCTS_KEY);
}