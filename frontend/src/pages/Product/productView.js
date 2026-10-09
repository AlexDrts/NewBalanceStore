function normalizeSize(size) {
    if (size === null || size === undefined || size === "") return size;

    const numeric = Number(size);
    return Number.isNaN(numeric) ? String(size) : numeric;
}

export function createProductView(data) {
    const images = data.images ?? {};
    const colors = Array.isArray(data.colors) && data.colors.length
        ? data.colors
        : Object.keys(images);

    const variants = (data.variants ?? []).map(variant => ({
        color: variant.color,
        size: normalizeSize(variant.size),
        quantity: Number(variant.quantity) || 0
    }));

    const findVariant = (color, size) => variants.find(
        variant => variant.color === color && String(variant.size) === String(size)
    );

    const view = {
        id: data.id,
        name: data.name ?? "",
        description: data.description ?? "",
        type: data.type ?? "",
        category: data.category ?? "",
        activity: data.activity ?? "",
        gender: data.gender ?? "",
        price: Number(data.price) || 0,
        oldPrice: data.oldPrice ?? null,
        isNew: Boolean(data.isNew),
        images,
        colors,
        variants,

        getImages(color) {
            return images[color ?? colors[0]] ?? [];
        },

        getMainImage(color) {
            return view.getImages(color)[0] ?? "";
        },

        hasDiscount() {
            return view.oldPrice !== null && Number(view.oldPrice) > view.price;
        },

        getDiscountPercent() {
            return view.hasDiscount() ? Math.round((1 - view.price / view.oldPrice) * 100) : 0;
        },

        getVariant: findVariant,

        getAvailableQuantity(color, size) {
            return findVariant(color, size)?.quantity ?? 0;
        },

        isAvailable(color, size) {
            if (color === undefined) return variants.some(v => v.quantity > 0);
            if (size === undefined) return view.isColorAvailable(color);
            return view.getAvailableQuantity(color, size) > 0;
        },

        isColorAvailable(color) {
            return variants.some(v => v.color === color && v.quantity > 0);
        },

        getSizes() {
            const sizes = [];
            for (const variant of variants) {
                if (!sizes.some(size => String(size) === String(variant.size))) {
                    sizes.push(variant.size);
                }
            }
            return sizes;
        }
    };

    return view;
}

export function pickRelatedProducts(current, products, limit = 12) {
    const same = (a, b) => Boolean(a) && Boolean(b) && String(a).toLowerCase() === String(b).toLowerCase();

    return products
        .filter(product => String(product.id) !== String(current.id))
        .map(product => ({
            product,
            score:
                (same(product.type, current.type) ? 4 : 0) +
                (same(product.activity, current.activity) ? 3 : 0) +
                (same(product.category, current.category) ? 2 : 0) +
                (same(product.gender, current.gender) || same(product.gender, "unisex") ? 1 : 0)
        }))
        .filter(item => item.score > 0)
        .sort((a, b) => (b.score - a.score) || (Number(Boolean(b.product.isNew)) - Number(Boolean(a.product.isNew))))
        .slice(0, limit)
        .map(item => item.product);
}

export function getCartQuantity(cart, productId, color, size) {
    const item = cart.products.find(entry =>
        entry.productId === productId &&
        entry.color === color &&
        String(entry.size) === String(size)
    );

    return item ? item.quantity : 0;
}