const COLOR_NAMES = {
    white: "White",
    white1: "White",
    white2: "White",
    black_and_white: "Black & White",
    black: "Black",
    gray: "Gray",
    grey: "Gray",
    tan: "Tan",
    green: "Green",
    blue: "Blue",
    purple: "Purple",
    pink: "Pink",
    red: "Red",
    brown: "Brown",
    multi_color: "Multi Color"
};

export function formatColorName(color) {
    if (!color) return "";

    const key = String(color).toLowerCase();
    if (COLOR_NAMES[key]) return COLOR_NAMES[key];

    return key
        .replace(/[-_]+/g, " ")
        .replace(/\d+$/g, "")
        .replace(/\band\b/g, "&")
        .trim()
        .replace(/\b\w/g, char => char.toUpperCase());
}

export function formatPrice(value) {
    const number = Number(value);
    if (Number.isNaN(number)) return "";

    return `$${number.toFixed(2)}`;
}

const FOOTWEAR_SIZES = [4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 14, 15];
const KIDS_FOOTWEAR_SIZES = [10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5];
const CLOTHING_SIZES = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

function sortSizes(sizes, order) {
    const index = size => {
        const found = order.findIndex(item => String(item) === String(size));
        return found === -1 ? Number.MAX_SAFE_INTEGER : found;
    };

    return [...sizes].sort((a, b) => {
        const diff = index(a) - index(b);
        if (diff !== 0) return diff;

        const na = Number(a);
        const nb = Number(b);
        if (!Number.isNaN(na) && !Number.isNaN(nb)) return na - nb;

        return String(a).localeCompare(String(b));
    });
}

export function getSizeGrid(product) {
    const variantSizes = product.getSizes();
    const isFootwear = product.type === "Footwear";
    const isKids = String(product.gender).toLowerCase() === "kids";

    let base = [];
    if (isFootwear) {
        base = isKids ? [] : FOOTWEAR_SIZES.filter(size => size >= 6 && size <= 13);
    }
    else if (product.type === "Clothing") {
        base = CLOTHING_SIZES.slice(0, 6);
    }

    const all = [...base];
    for (const size of variantSizes) {
        if (!all.some(item => String(item) === String(size))) {
            all.push(size);
        }
    }

    const order = isFootwear
        ? (isKids ? KIDS_FOOTWEAR_SIZES : FOOTWEAR_SIZES)
        : CLOTHING_SIZES;

    return sortSizes(all, order);
}

export function formatSizeLabel(product, size) {
    const isFootwear = product.type === "Footwear";
    const isUnisex = String(product.gender).toLowerCase() === "unisex";
    const numeric = Number(size);

    if (isFootwear && isUnisex && !Number.isNaN(numeric)) {
        return `M${numeric} / W${numeric + 1.5}`;
    }

    return String(size);
}

export function formatTypeLabel(type) {
    if (type === "Footwear") return "Shoes";
    return type ?? "";
}