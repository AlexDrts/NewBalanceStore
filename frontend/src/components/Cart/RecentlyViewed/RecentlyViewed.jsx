import styles from './RecentlyViewed.module.css';
import { getRecentlyViewed } from "../../../utils/recentlyViewed.js";
import ProductCard from "../../ProductCard/ProductCard.jsx";
import { useEffect, useState, useRef } from "react";
import { getProducts } from "../../../services/productsService.js";

function RecentlyViewed() {
    const [products, setProducts] = useState([]);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const sliderRef = useRef(null);

    useEffect(() => {
        async function loadProducts() {
            const data = await getProducts();
            setProducts(data.filter(product => !product.featured));
        }

        loadProducts();
    }, []);

    const ids = getRecentlyViewed();

    const recentProducts = (ids !== null)
        ? ids.map(id => products.find(product => product.id === id)).filter(Boolean)
        : null;

    const checkScrollPosition = () => {
        if (sliderRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;

            setCanScrollLeft(scrollLeft > 2);

            setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 2);
        }
    };

    useEffect(() => {
        checkScrollPosition();
        window.addEventListener('resize', checkScrollPosition);
        return () => window.removeEventListener('resize', checkScrollPosition);
    }, [recentProducts]);

    if (!recentProducts || recentProducts.length === 0) {
        return null;
    }

    const scroll = (direction) => {
        if (sliderRef.current) {
            const { scrollLeft, clientWidth } = sliderRef.current;
            const scrollAmount = clientWidth * 0.75;
            sliderRef.current.scrollTo({
                left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className={styles.recentlyViewedSection}>
            <div className={styles.headerRow}>
                <h2>Recently viewed</h2>
            </div>

            <div className={styles.sliderWrapper}>
                {/* Left arrow */}
                {canScrollLeft && (
                    <button
                        className={`${styles.navButton} ${styles.prevButton}`}
                        onClick={() => scroll('left')}
                        aria-label="Previous items"
                    >
                        ‹
                    </button>
                )}

                {/* Slider with products */}
                <div
                    className={styles.recentlyViewedSlider}
                    ref={sliderRef}
                    onScroll={checkScrollPosition}
                >
                    {recentProducts.map(product => (
                        <div key={product.id} className={styles.sliderItem}>
                            <ProductCard
                                product={product}
                                page="cart"
                            />
                        </div>
                    ))}
                </div>

                {/* Right arrow */}
                {canScrollRight && (
                    <button
                        className={`${styles.navButton} ${styles.nextButton}`}
                        onClick={() => scroll('right')}
                        aria-label="Next items"
                    >
                        ›
                    </button>
                )}
            </div>
        </section>
    );
}

export default RecentlyViewed;