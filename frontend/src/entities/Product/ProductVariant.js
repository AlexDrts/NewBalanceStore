export class ProductVariant {
    color;
    size;
    quantity;

    constructor(data) {
        this.color = data.color;
        this.size = Number(data.size);
        this.quantity = data.quantity;
    }
}