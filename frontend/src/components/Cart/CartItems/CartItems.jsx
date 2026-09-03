import styles from './CartItems.module.css';
import CartItem from "../CartItem/CartItem.jsx";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "../../../services/productsService.js";

function CartItems({ cart }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function loadProducts() {
            setProducts(await getProducts());
        }

        loadProducts();
    }, []);

    if (!products.length) {
        return <p>Loading...</p>;
    }

    const cartProducts = cart.getItems(products);

    const productCount = cart.getProductCount();

    return (
        <div className={styles.cartItems}>

            <div className={styles.cartHeader}>
                <h2>My Bag</h2>

                <span className={styles.cartItemCount}>
                    {productCount} {productCount === 1 ? "Item" : "Items"}
                </span>
            </div>

            { cart.isEmpty() ? (
                    <div className={styles.emptyCart}>
                        <h3>Your bag is empty</h3>

                        <p>There are no items in your bag.</p>

                        <Link
                            to="/products"
                            className={styles.continueBtn}
                        >
                            Continue Shopping
                        </Link>
                    </div>
                ) : (cartProducts.map(item => (
                    <CartItem
                    key={`${item.product.id}-${item.color}-${item.size}`}
                    cartProduct={item}
                />
                ))
            )}

        </div>
    );
}

export default CartItems
