import styles from './Cart.module.css'
import TopHeader from "../../components/TopHeader/TopHeader.jsx";
import MainHeader from "../../components/MainHeader/MainHeader.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import CartSummary from "../../components/Cart/CartSummary/CartSummary.jsx";
import CartItems from "../../components/Cart/CartItems/CartItems.jsx";
import { useRef } from "react";
import RecentlyViewed from "../../components/Cart/RecentlyViewed/RecentlyViewed.jsx";
import { useCart } from "../../context/useCart.js";

function Cart() {
    const { cart } = useCart();

    const cartRef = useRef(null);
    const hasItems = !cart.isEmpty();
    return (
        <>
            <TopHeader />

            <section
                ref={cartRef}
                className={styles.cartHero}
            >
                <MainHeader theme={"light"} containerRef={cartRef}/>
            </section>


            <div className={`${styles.cartContainer} ${!hasItems ? styles.cartContainerFull : ""}`}>
                <CartItems
                    cart={cart}
                />

                {hasItems && (
                    <CartSummary
                        cart={cart}
                    />
                )}
            </div>

            <RecentlyViewed />

            <Footer />
        </>
    )
}

export default Cart
