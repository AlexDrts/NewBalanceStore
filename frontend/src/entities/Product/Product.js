export class Product {
    id;
    images;
    name;
    oldPrice;
    price;
    sizes;
    colors;
    gender;
    type;
    category;
    activity;
    description;
    isNew;
    inStock;

    constructor(data) {
        Object.assign(this, data);
    }

    getMainImage(color = null) {
        const imageColor = color ?? this.colors[0];
        return this.images[imageColor][0];
    }

    isAvailable() {
        return this.inStock !== false;
    }

    hasDiscount() {
        return this.oldPrice !== null;
    }
}
