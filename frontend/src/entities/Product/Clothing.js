import { Product } from "./Product";

export class Clothing extends Product {
    constructor(data) {
        super(data);
    }

    isClothing() {
        return true;
    }
}