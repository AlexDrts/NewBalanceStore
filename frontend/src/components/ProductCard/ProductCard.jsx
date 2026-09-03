import { Link } from "react-router-dom";
import styles from './ProductCard.module.css'
import { useState } from "react";


function ProductCard({ product, onQuickAdd, page }) {
    const [activeColor, setActiveColor] = useState(
        Object.keys(product.images)[0]
    );
    const [startIndex, setStartIndex] = useState(0);
    const visibleColors = 8;
    const colors = Object.keys(product.images);
    const showSliderButtons = colors.length > visibleColors;

    const [hovered, setHovered] = useState(false);
    const currentImages = product.images[activeColor];
    const image =
        hovered && currentImages.length > 1
            ? currentImages[1]
            : currentImages[0];


    const isHome = page === "home";
    const isCart = page === "cart";

    return (
        <div className={styles.productCard}>
            <Link to={`/product/${product.id}`}>
                <img
                    src={isCart ? currentImages[0] : image}
                    onMouseEnter={!isCart ? () => setHovered(true) : undefined}
                    onMouseLeave={!isCart ? () => setHovered(false) : undefined}
                    alt={product.name}

                />
            </Link>

            { /* ColorSlider START*/ }
            {!isHome && !isCart && (
                <>
                    <div className={styles.colorSliderWrapper}>
                        { showSliderButtons && (
                            <button
                                onClick={() => setStartIndex(prev => prev - 1)}
                                className={styles.sliderBtn}
                            >
                                ❮
                            </button>
                        )}

                        <div className={styles.colorSlider}>
                            {colors
                                .slice(startIndex, startIndex + visibleColors)
                                .map(color => (
                                    <img
                                        key={color}
                                        src={product.getMainImage(color)}
                                        onClick={() => setActiveColor(color)}
                                        className={
                                            color === activeColor
                                                ? styles.active
                                                : ""
                                        }
                                    />
                                ))}
                        </div>

                        { showSliderButtons && (
                            <button
                                onClick={() => setStartIndex(prev => prev + 1)}
                                className={styles.sliderBtn}
                            >
                                ❯
                            </button>
                        )}
                    </div>
                    {/*ColorSlider END*/}

                    <button
                        className={styles.quickAddBtn}
                        onClick={() => onQuickAdd(product, activeColor)}
                    >
                        <img src="../src/assets/icons/header/bag.svg" alt="Bag" />
                    </button>
                </>
                )}






            {product.isNew && (
                <span className={styles.newBadge}>NEW</span>
            )}
            <Link
                to={`/product/${product.id}`}
                className={styles.productTitle}
            >
                {product.name}
            </Link>

            <p className={styles.productSubtitle}>
                {product.gender}
            </p>

            <div className={styles.productPrice}>
                ${product.price}

                {product.hasDiscount() && (
                    <span className={styles.oldPrice}>
                        ${product.oldPrice}
                    </span>
                )}
            </div>

        </div>
    );
}

export default ProductCard
