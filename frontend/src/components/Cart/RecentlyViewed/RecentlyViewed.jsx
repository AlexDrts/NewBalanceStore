import styles from './RecentlyViewed.module.css';
import { getRecentlyViewed } from "../../../utils/recentlyViewed.js";
import ProductCard from "../../ProductCard/ProductCard.jsx";
import { useEffect, useState } from "react";
import { getProducts } from "../../../services/productsService.js";

function RecentlyViewed() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function loadProducts() {
            const data = await getProducts();
            setProducts(data.filter(product => !product.featured));
        }

        loadProducts();
    }, []);

    const ids = getRecentlyViewed();

    const recentProducts = ids
        .map(id => products.find(product => product.id === id))
        .filter(Boolean);

    if (recentProducts.length === 0) {
        return null;
    }

    return (
        <section className={styles.recentlyViewedSection}>
            <h2>Recently viewed</h2>

            <div className={styles.recentlyViewedGrid}>
                {recentProducts.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        page="cart"
                    />
                ))}
            </div>
        </section>
    );
}

export default RecentlyViewed;