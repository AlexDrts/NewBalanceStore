import styles from './CartItem.module.css'
import ConfirmModal from "../../ConfirmModal/ConfirmModal.jsx";
import { useState } from "react";
import { useCart } from "../../../context/useCart.js";

function CartItem({ cartProduct }) {
    const product = cartProduct.product;

    const { dispatch } = useCart();

    const colorMap = {
        white: "White",
        white1: "White",
        white2: "White",
        black_and_white: "Black & White",
        black: "Black",
        gray: "Gray",
        tan: "Tan",
        green: "Green",
        blue: "Blue",
        purple: "Purple",
        pink: "Pink",
        red: "Red",
        multi_color: "Multi Color"
    };
    const color = cartProduct.color;

    const increaseQuantity = () => {
        if (cartProduct.quantity >= 5) return;

        dispatch({
            type: "UPDATE_QUANTITY",
            payload: {
                id: product.id,
                color: cartProduct.color,
                size: cartProduct.size,
                quantity: cartProduct.quantity + 1
            }
        });
    };

    const qtyDecreaseClick = () => {
        if (cartProduct.quantity <= 1) return;

        dispatch({
            type: "UPDATE_QUANTITY",
            payload: {
                id: product.id,
                color: cartProduct.color,
                size: cartProduct.size,
                quantity: cartProduct.quantity - 1
            }
        });
    };


    const [showConfirm, setShowConfirm] = useState(false);
    const removeClick = () => {
        setShowConfirm(true);
    };

    const confirmRemove = () => {
        dispatch({
            type: "REMOVE_PRODUCT",
            payload: {
                id: product.id,
                color: cartProduct.color,
                size: cartProduct.size
            }
        });

        setShowConfirm(false);
    };

    return (
        <>
            <div className={styles.cartItem}>
                <div className={styles.cartItemImage}>
                    <img
                        src={product.images[cartProduct.color][0]}
                        alt={product.name}
                    />
                </div>

                <div className={styles.cartItemInfo}>
                    <h3 className={styles.cartItemTitle}>{product.name}</h3>
                    <p className={styles.cartItemText}>{product.gender}</p>
                    <p className={styles.cartItemText}>Color: {colorMap[color] || color}</p>
                    <p className={styles.cartItemText}>Size: {cartProduct.size}</p>

                    <div className={styles.qtyRow}>
                        <button
                            onClick={qtyDecreaseClick}
                            className={styles.qtyBtn}>
                            -
                        </button>

                        <span>Qty: {cartProduct.quantity}</span>

                        <button
                            onClick={increaseQuantity}
                            className={styles.qtyBtn}>
                            +
                        </button>
                    </div>
                </div>

                <div className={styles.cartItemActions}>
                    <button
                        onClick={removeClick}
                        className={styles.removeBtn}
                    >
                        ×
                    </button>

                    <div className={styles.cartPrice}>
                        {product.oldPrice && (
                            <span className={styles.oldPrice}>
                                ${(product.oldPrice * cartProduct.quantity).toFixed(2)}
                            </span>
                        )}
                        <span>
                            ${(product.price * cartProduct.quantity).toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>

            <ConfirmModal
                isOpen={showConfirm}
                title="Remove item?"
                message={`Remove "${product.name}" from your bag?`}
                onConfirm={confirmRemove}
                onCancel={() => setShowConfirm(false)}
            />
        </>
    )
}

export default CartItem
