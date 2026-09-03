import { describe, it, expect } from "vitest";
import { Order } from "../entities/Order.js";

describe("Order", () => {
    const orderData = {
        firstName: "Alex",
        lastName: "Test",
        email: "test@gmail.com",
        phoneNumber: "+12345678910",
        streetAddress: "USA",
        newsletter: true,
        products: [
            {
                product: {
                    id: 1,
                    name: "9060",
                    price: 159.99,
                },
                color: "white",
                size: 9,
                quantity: 2,
            },
            {
                product: {
                    id: 2,
                    name: "T-Shirt",
                    price: 40,
                },
                color: "black",
                size: "M",
                quantity: 1,
            },
        ],
        subtotal: 359.98,
        tax: 28.8,
        total: 388.78,
    };

    it("creates an order with correct data", () => {
        const order = new Order(orderData);

        expect(order.firstName).toBe("Alex");
        expect(order.lastName).toBe("Test");
        expect(order.email).toBe("test@gmail.com");
        expect(order.phoneNumber).toBe("+12345678910");
        expect(order.streetAddress).toBe("USA");
        expect(order.newsletter).toBe(true);
        expect(order.status).toBe("Pending");
    });

    it("generates an id and date", () => {
        const order = new Order(orderData);

        expect(order.id).toBeTypeOf("number");
        expect(order.date).toBeTypeOf("string");
    });

    it("returns the order total", () => {
        const order = new Order(orderData);

        expect(order.getTotal()).toBe(388.78);

    });

    it("returns the total number of products", () => {
        const order = new Order(orderData);

        expect(order.getProductCount()).toBe(3);
    });

    it("marks the order as paid", () => {
        const order = new Order(orderData);

        order.markAsPaid();

        expect(order.status).toBe("Paid");
    });

    it("cancels the order", () => {
        const order = new Order(orderData);

        order.cancel();

        expect(order.status).toBe("Cancelled");
    });
});