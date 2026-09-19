export class ProductVariant {
    color;
    size;
    quantity;

    constructor(data) {
        Object.assign(this, data);
    }
}