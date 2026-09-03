import { Product } from "./Product";

export class Accessory extends Product {
    constructor(data) {
        super(data);
    }

    isAccessory() {
        return true;
    }
}