import { describe, it, expect } from "vitest";
import { Cart } from "../entities/Cart.js";

describe("Cart", () => {
    const shoe = {
        id: 1,
        name: "9060",
        price: 159.99,
        oldPrice: null,
        hasDiscount() {
            return false;
        },
    };

    it("adds a product to the cart", () => {
        const cart = new Cart();

        cart.addProduct(shoe, "white", 9);

        expect(cart.products).toHaveLength(1);
        expect(cart.products[0].productId).toBe(1);
        expect(cart.products[0].color).toBe("white");
        expect(cart.products[0].size).toBe(9);
        expect(cart.products[0].quantity).toBe(1);
    });

    it("increases quantity when the same product is added", () => {
        const cart = new Cart();

        cart.addProduct(shoe, "white", 9);
        cart.addProduct(shoe, "white", 9);

        expect(cart.products).toHaveLength(1);
        expect(cart.products[0].quantity).toBe(2);
    });

    it("does not allow more than five of the same product", () => {
        const cart = new Cart();

        for (let i = 0; i < 6; ++i) {
            cart.addProduct(shoe, "white", 9);
        }

        expect(cart.products[0].quantity).toBe(5);
    });

    it("updates product quantity", () => {
        const cart = new Cart();

        cart.addProduct(shoe, "white", 9);
        cart.updateQuantity(1, "white", 9, 4);

        expect(cart.products[0].quantity).toBe(4);
    });

    it("removes a product from the cart", () => {
        const cart = new Cart();

        cart.addProduct(shoe, "white", 9);
        cart.removeProduct(1, "white", 9);

        expect(cart.products).toHaveLength(0);
    });

    it("returns the total number of products", () => {
        const cart = new Cart();

        cart.addProduct(shoe, "white", 9);
        cart.addProduct(shoe, "white", 9);
        cart.addProduct(shoe, "black", 10);

        expect(cart.getProductCount()).toBe(3);
    });

    it("checks whether the cart is empty", () => {
        const cart = new Cart();

        expect(cart.isEmpty()).toBe(true);

        cart.addProduct(shoe, "white", 9);

        expect(cart.isEmpty()).toBe(false);
    });

    it("calculates subtotal, tax and total", () => {
        const cart = new Cart();

        cart.addProduct(shoe, "white", 9);
        cart.addProduct(shoe, "white", 9);

        const products = [shoe];

        expect(cart.getSubtotal(products)).toBeCloseTo(319.98);
        expect(cart.getTax(products)).toBeCloseTo(25.5984);
        expect(cart.getTotal(products)).toBeCloseTo(345.5784);
    });
});