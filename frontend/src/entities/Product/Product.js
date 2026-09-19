import { ProductVariant } from "./ProductVariant.js";

export class Product {
    id;
    name;
    description;
    type;
    category;
    activity;
    gender;
    oldPrice;
    price;
    images;
    colors;
    isNew;
    variants;

    constructor(data) {
        Object.assign(this, data);

        this.variants = (data.variants ?? []).map(
            variant => new ProductVariant(variant)
        );
    }

    getMainImage(color = null) {
        const imageColor = color ?? this.colors[0];
        return this.images[imageColor][0];
    }

    hasDiscount() {
        return this.oldPrice !== null;
    }

    getVariant(color, size) {
        return this.variants.find(
            variant =>
                variant.color === color &&
                variant.size === size
        )
    }

    getAvailableQuantity(color, size) {
        const variant = this.getVariant(color, size);
        return variant ? variant.quantity : 0;
    }

    isAvailable(color, size) {
        return this.getAvailableQuantity(color, size) > 0;
    }


}
