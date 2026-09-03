import { Product } from './Product.js';

export class Shoe extends Product {
    constructor(data) {
        super(data);
    }

    isFootwear() {
        return true;
    }
}