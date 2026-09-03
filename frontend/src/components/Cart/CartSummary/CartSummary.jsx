import styles from './CartSummary.module.css'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "../../../services/productsService.js";

function SummaryRow({ left, right, className = "" }) {
    return (
        <div className={`${styles.summaryRow} ${className}`}>
            <span>{left}</span>
            <span>{right}</span>
        </div>
    )
}

function CartSummary({ cart }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function loadProducts() {
            setProducts(await getProducts());
        }
        loadProducts();
    }, []);

    const navigate = useNavigate();

    if (!products.length) {
        return <p>Loading...</p>;
    }

    const subtotal = cart.getSubtotal(products);

    const originalPrice = cart.getOriginalPrice(products);
    const savings = cart.getSavings(products);
    const hasDiscount = originalPrice > subtotal;

    const checkoutClick = () => {
        navigate("/checkout");
    }


    return (
        <>
            <div className={styles.cartSummary}>
                <aside>
                    <h3>Order Summary</h3>

                    {hasDiscount && (
                        <>
                            <SummaryRow
                                left="Original Price"
                                right={`$${originalPrice.toFixed(2)}`}
                            />

                            <SummaryRow
                                left="Your savings"
                                right={`$${savings.toFixed(2)}`}
                                className={styles.savingsRow}
                            />
                        </>
                    )}

                    <SummaryRow
                        left="Subtotal"
                        right={`$${subtotal.toFixed(2)}`}
                    />
                    <SummaryRow
                        left="Shipping: Standard"
                        right="FREE"
                    />
                    <SummaryRow
                        left="Sales tax"
                        right="Calculated at checkout"
                    />
                </aside>
                <div className={styles.summaryTotal}>
                    <span>Order total</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>

                <button className={styles.checkoutBtn} onClick={checkoutClick}>Checkout</button>
            </div>
        </>
    )
}

export default CartSummary