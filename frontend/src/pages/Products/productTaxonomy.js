const RUNNING_PATTERN = /running shoe|everyday miles|road work|long run|marathon/;

const SUBCATEGORY_PATTERNS = [
    { category: "hoodies & sweatshirts", pattern: /hood|sweatshirt|crew\b|pullover|fleece/ },
    { category: "jackets & vests", pattern: /jacket|vest|anorak|windbreaker|parka/ },
    { category: "shirts", pattern: /shirt|tee\b|top\b|tank|polo|jersey|sleeve/ },
    { category: "shorts", pattern: /short/ },
    { category: "pants", pattern: /pant|jogger|legging|tight|trouser/ },
    { category: "socks", pattern: /sock/ },
    { category: "bags", pattern: /bag|backpack|tote|duffel/ },
    { category: "hats & gloves", pattern: /hat\b|cap\b|beanie|glove|headband/ },
];

function getSearchText(product) {
    return `${product.name ?? ""} ${product.description ?? ""}`.toLowerCase();
}

export function getProductActivity(product) {
    if (product.activity && product.activity.trim())
        return product.activity.trim();

    const text = getSearchText(product);
    if ((product.type ?? "").toLowerCase() === "footwear" && RUNNING_PATTERN.test(text) && !text.includes("inspired"))
        return "Running";

    return "Lifestyle";
}

export function matchesActivity(product, activity) {
    return getProductActivity(product).toLowerCase() === activity.toLowerCase();
}

export function matchesCategory(product, category) {
    const wanted = category.toLowerCase();
    const productCategory = (product.category ?? "").toLowerCase();

    if (productCategory === wanted)
        return true;

    if (wanted === "shoes")
        return (product.type ?? "").toLowerCase() === "footwear";

    const rule = SUBCATEGORY_PATTERNS.find(item => item.category === wanted);
    if (!rule)
        return false;

    const name = (product.name ?? "").toLowerCase();
    const firstMatch = SUBCATEGORY_PATTERNS.find(item => item.pattern.test(name));
    return firstMatch?.category === wanted;
}
