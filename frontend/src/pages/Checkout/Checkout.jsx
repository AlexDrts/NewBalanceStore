import styles from './Checkout.module.css'
import { Link, useNavigate } from "react-router-dom";
import { clearCart, getCart } from "../../utils/cartStorage.js";
import { useEffect, useState } from "react";
import { getProducts } from "../../services/productsService.js";
import { Cart } from "../../entities/Cart.js";
import { Order } from "../../entities/Order.js";

function Checkout() {
    const [products, setProducts] = useState([]);

    const [form, setForm] = useState({
        email: "",
        phone: "",
        firstName: "",
        lastName: "",
        address: "",
        country: "United States",
        newsletter: false,
    });

    useEffect(() => {
        async function loadProducts() {
            setProducts(await getProducts());
        }
        loadProducts();
    }, []);

    const navigate = useNavigate();

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

    if (!products.length) {
        return <p>Loading...</p>;
    }

    const cart = new Cart(getCart());

    const cartProducts = cart.getItems(products);

    const originalPrice = cart.getOriginalPrice(products);
    const savings = cart.getSavings(products);

    const subtotal = cart.getSubtotal(products);
    const hasDiscount = originalPrice > subtotal;

    const tax = cart.getTax(products);
    const total = cart.getTotal(products);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);

    const phoneValid = /^\+?[0-9\s()-]{10,20}$/.test(form.phone);

    const formValid =
        emailValid &&
        phoneValid &&
        form.firstName &&
        form.lastName &&
        form.address;


    const order = new Order({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phoneNumber: form.phone,
        streetAddress: form.address,
        newsletter: form.newsletter,
        products: cartProducts,
        subtotal,
        tax,
        total,
    });

    function handleSubmit() {
        order.markAsPaid();

        console.log("Created order:", order);

        clearCart();

        navigate("/");
    }

    return (
        <>

            <header className={styles.checkoutHeader}>
                <div className={styles.headerInner}>
                    <div className={styles.brand}>
                        <Link to="/">
                            <img src="../src/assets/icons/footer/logo.svg" alt="NB Logo"/>
                        </Link>
                        <span>Secure checkout</span>
                    </div>
                    <div className={styles.cart}>
                        <Link to="/cart">
                            <img src="../src/assets/icons/header/cart.svg" alt=""/>
                        </Link>
                    </div>
                </div>
            </header>

            <div className={styles.checkoutWrapper}>

                <div className={styles.breadcrumbs}>
                    <span>Shipping info</span>
                    <span>Payment</span>
                    <span>Review and buy</span>
                </div>

                <div className={styles.checkoutGrid}>

                    <div className={styles.checkoutMain}>

                        {/*Contact Section*/}
                        <section className={`${styles.section} ${styles.contactSection}`}>
                            <h2>Contact</h2>
                            <div className={styles.row}>
                                <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange}/>
                                <input name="phone" type="tel" placeholder="Phone number" value={form.phone} onChange={handleChange}/>
                            </div>
                            <label className={styles.newsletter}>
                                <input name="newsletter" type="checkbox" checked={form.newsletter} onChange={handleChange}/>
                                <span>
                                    Sign up for email to hear about product launches, exclusive offers and athlete news. By subscribing, I am agreeing to the New Balance <a href="#">Privacy Policy</a> and <a href="#">Terms & Conditions</a>.
                                </span>
                            </label>
                        </section>

                        <section className={`${styles.section} ${styles.shippingSection}`}>
                            <h2>Shipping address</h2>
                            <div className={styles.row}>
                                <input name="firstName" type="text" placeholder="First Name" value={form.firstName} onChange={handleChange}/>
                                <input name="lastName" type="text" placeholder="Last Name" value={form.lastName} onChange={handleChange}/>
                            </div>
                            <input name="address" type="text" placeholder="Street Address" value={form.address} onChange={handleChange}/>
                        </section>

                        <button disabled={!formValid} className={styles.continueBtn} onClick={handleSubmit}>Place Order</button>

                    </div>

                    {/*Summary Section*/}
                    <aside className={styles.summary}>
                        <h2>Order Summary</h2>

                        {hasDiscount && (
                            <>
                                <p className={styles.summaryRow}>
                                    <span>Original Price</span>
                                    <span>${originalPrice.toFixed(2)}</span>
                                </p>

                                <p className={`${styles.summaryRow} ${styles.savingsRow}`}>
                                    <span>Your savings</span>
                                    <span>${savings.toFixed(2)}</span>
                                </p>

                            </>
                        )

                        }

                        <p className={styles.summaryRow}>
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </p>

                        <p className={styles.summaryRow}>
                            <span>Shipping: Standard</span>
                            <span>FREE</span>
                        </p>

                        <p className={styles.summaryRow}>
                            <span>Total Tax</span>
                            <span>${tax.toFixed(2)}</span>
                        </p>

                        <p className={`${styles.section} ${styles.orderTotal}`}>
                            <span>Order Total </span>
                            <span>${total.toFixed(2)}</span>
                        </p>
                        <div className={styles.checkoutProducts}>
                            {cartProducts.map(item => (
                                <div
                                    key={`${item.product.id}-${item.color}-${item.size}`}
                                    className={styles.checkoutProduct}
                                >
                                    <img
                                        className={styles.checkoutProductImage}
                                        src={item.product.images[item.color][0]}
                                        alt={item.product.name}
                                    />

                                    <div className={styles.checkoutProductInfo}>

                                        <h4>{item.product.name}</h4>

                                        <p>{item.product.gender}</p>

                                        <p>Color: {colorMap[item.color] || item.color}</p>

                                        <p>Size: {item.size}</p>

                                        <p>Qty: {item.quantity}</p>

                                        <p className={styles.checkoutProductPrice}>
                                            <span>
                                                ${(item.product.price * item.quantity).toFixed(2)}
                                            </span>

                                            {item.product.oldPrice && (
                                                <span className={styles.oldPrice}>
                                                    ${(item.product.oldPrice * item.quantity).toFixed(2)}
                                                </span>
                                            )}

                                        </p>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </aside>

                </div>
            </div>

        </>
    )
}

export default Checkout
