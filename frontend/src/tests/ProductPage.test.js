import { describe, it, expect } from "vitest";
import { createProductView, getCartQuantity, pickRelatedProducts } from "../pages/Product/productView.js";
import { formatColorName, formatSizeLabel, getSizeGrid } from "../utils/productFormat.js";
import { Cart } from "../entities/Cart.js";
import { formatMeasurement, getGuideTitle, getGuideType, getShoeSizeTable, getWidthTable } from "../components/ProductPage/SizeGuide/sizeGuideData.js";
import { cartReducer } from "../reducers/cartReducer.js";

const shoeData = {
    id: 7,
    name: "9060",
    type: "Footwear",
    category: "Shoes",
    gender: "Unisex",
    price: 159.99,
    oldPrice: 199.99,
    colors: [],
    images: { white: ["w1.jpg", "w2.jpg"], black: ["b1.jpg"] },
    variants: [
        { color: "white", size: "9", quantity: 2 },
        { color: "white", size: "9.5", quantity: 0 },
        { color: "black", size: "8", quantity: 0 }
    ]
};

const shirtData = {
    id: 10,
    name: "Soccer T-Shirt",
    type: "Clothing",
    gender: "Men",
    price: 40,
    oldPrice: null,
    colors: ["red"],
    images: { red: ["r1.jpg"] },
    variants: [
        { color: "red", size: "M", quantity: 3 },
        { color: "red", size: "XL", quantity: 0 }
    ]
};

describe("createProductView", () => {
    it("falls back to image keys when the API returns no colors", () => {
        const view = createProductView(shoeData);
        expect(view.colors).toEqual(["white", "black"]);
        expect(view.getMainImage("white")).toBe("w1.jpg");
        expect(view.getMainImage("unknown")).toBe("");
    });

    it("keeps clothing sizes as strings and shoe sizes as numbers", () => {
        expect(createProductView(shirtData).getSizes()).toEqual(["M", "XL"]);
        expect(createProductView(shoeData).getSizes()).toEqual([9, 9.5, 8]);
    });

    it("finds stock for a variation", () => {
        const shirt = createProductView(shirtData);
        expect(shirt.isAvailable("red", "M")).toBe(true);
        expect(shirt.isAvailable("red", "XL")).toBe(false);

        const shoe = createProductView(shoeData);
        expect(shoe.getAvailableQuantity("white", 9)).toBe(2);
        expect(shoe.isColorAvailable("black")).toBe(false);
        expect(shoe.isAvailable()).toBe(true);
    });

    it("detects discounts", () => {
        expect(createProductView(shoeData).hasDiscount()).toBe(true);
        expect(createProductView(shoeData).getDiscountPercent()).toBe(20);
        expect(createProductView(shirtData).hasDiscount()).toBe(false);
    });
});

describe("pickRelatedProducts", () => {
    it("excludes the current product and prefers the same type", () => {
        const current = createProductView(shoeData);
        const catalog = [
            { id: 7, type: "Footwear" },
            { id: 10, type: "Clothing", gender: "Unisex" },
            { id: 8, type: "Footwear", category: "Shoes" },
            { id: 99, type: "Accessories", gender: "Women" }
        ];

        expect(pickRelatedProducts(current, catalog).map(p => p.id)).toEqual([8, 10]);
    });
});

describe("adding to the shared cart", () => {
    it("adds the selected quantity with productId, color and size", () => {
        let state = new Cart();

        for (let i = 0; i < 3; i++) {
            state = cartReducer(state, {
                type: "ADD_PRODUCT",
                payload: { product: { id: 7 }, productId: 7, color: "white", size: 9, quantity: 3 }
            });
        }

        expect(state.products).toEqual([{ productId: 7, color: "white", size: 9, quantity: 3 }]);
        expect(getCartQuantity(state, 7, "white", "9")).toBe(3);
    });
});

describe("product format helpers", () => {
    it("formats color names", () => {
        expect(formatColorName("white2")).toBe("White");
        expect(formatColorName("black_and_white")).toBe("Black & White");
    });

    it("labels unisex shoe sizes like newbalance.com", () => {
        expect(formatSizeLabel(createProductView(shoeData), 9)).toBe("M9 / W10.5");
        expect(formatSizeLabel(createProductView(shirtData), "M")).toBe("M");
    });

    it("builds an ordered size grid with every variant size", () => {
        const grid = getSizeGrid(createProductView(shirtData)).map(String);
        expect(grid.indexOf("M")).toBeLessThan(grid.indexOf("XL"));

        const shoeGrid = getSizeGrid(createProductView(shoeData)).map(Number);
        expect(shoeGrid).toEqual([...shoeGrid].sort((a, b) => a - b));
        expect(shoeGrid).toContain(9.5);
    });
});

describe("size guide", () => {
    it("picks the guide that matches the product", () => {
        const shoe = getGuideType(createProductView(shoeData));
        expect(shoe).toEqual({ kind: "shoes", gender: "men" });
        expect(getGuideTitle(shoe)).toBe("Men's/Unisex");
        expect(getGuideType({ type: "Clothing", gender: "Women" })).toEqual({ kind: "apparel", gender: "women" });
    });

    it("builds the size table like newbalance.com", () => {
        const table = getShoeSizeTable("men");
        expect(table.columns).toEqual(["Men's US Size", "Women's US Size", "Length (cm)", "Length (in)", "UK size", "EU size"]);
        expect(table.rows).toHaveLength(30);
        expect(table.rows[0]).toEqual([2.5, 4, 20.5, "8 1/8", 2, 34]);
        expect(table.rows.find(row => row[0] === 9)).toEqual([9, 10.5, 27, "10 5/8", 8.5, 42.5]);
        expect(table.rows.at(-1)).toEqual([20, "-", 38, "15", 19.5, 55]);

        const women = getShoeSizeTable("women");
        expect(women.columns[0]).toBe("Women's US Size");
        expect(women.rows[0]).toEqual([4, 2.5, 20.5, "8 1/8", 2, 34]);
        expect(women.rows.some(row => row[0] === "-")).toBe(false);
    });

    it("builds the width table like newbalance.com", () => {
        const table = getWidthTable("men");
        expect(table.columns).toHaveLength(9);
        expect(table.rows).toHaveLength(19);
        expect(table.rows[0]).toEqual([6, 9.3, "3 5/8", 9.7, "3 7/8", 10.1, "4 1/8", 10.4, "4 1/8"]);
        expect(table.rows.at(-1)).toEqual([16, 11.5, "4 1/2", 11.8, "4 5/8", 12.2, "4 7/8", 12.5, "4 7/8"]);
        expect(formatMeasurement([38, 40], "cm")).toBe("97–102");
    });
});