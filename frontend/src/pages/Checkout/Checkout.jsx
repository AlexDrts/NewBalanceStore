import styles from './Checkout.module.css'
import { Link, useNavigate } from "react-router-dom";
import { clearCart, getCart } from "../../utils/cartStorage.js";
import { useEffect, useState } from "react";
import { getProducts } from "../../services/productsService.js";
import { Cart } from "../../entities/Cart.js";
import { Order } from "../../entities/Order.js";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay.jsx";
import { useLoadingAction } from "../../components/LoadingOverlay/useLoadingAction.js";

import logoSvg from '../../assets/icons/footer/logo.svg';
import cartSvg from '../../assets/icons/header/cart.svg';

const STEPS = ["Shipping info", "Payment", "Review and buy"];

const GENDER_LABELS = {
    men: "Men's",
    women: "Women's",
    kids: "Kids'",
    unisex: "Unisex",
};

const PAYMENT_METHODS = ["Visa", "Mastercard", "American Express", "Discover"];

const LEGAL_LINKS = [
    { label: "Terms & Conditions", to: "/terms" },
    { label: "Privacy Policy", to: "/privacy-policy" },
    { label: "CA Supply Chains Act (SB 657) and Modern Slavery Act Statement", to: "/supply-chains-act" },
];

function Field({ label, name, error, required = true, className = "", ...props }) {
    return (
        <label className={`${styles.field} ${error ? styles.fieldError : ""} ${className}`}>
            <input name={name} placeholder=" " {...props} />
            <span className={styles.fieldLabel}>
                {label}{required && <span className={styles.required}> *</span>}
            </span>
            {error && <span className={styles.errorText}>{error}</span>}
        </label>
    );
}

function InfoIcon() {
    return (
        <svg className={styles.infoIcon} viewBox="0 0 20 20" aria-hidden="true">
            <circle cx="10" cy="10" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <path d="M10 9v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="10" cy="6.2" r="1" fill="currentColor" />
        </svg>
    );
}

function Checkout() {
    const [products, setProducts] = useState([]);
    const [step, setStep] = useState(0);
    const [showErrors, setShowErrors] = useState(false);
    const { loading, run } = useLoadingAction();

    const [form, setForm] = useState({
        email: "",
        phone: "",
        firstName: "",
        lastName: "",
        address: "",
        country: "United States",
        newsletter: false,
        cardNumber: "",
        cardName: "",
        cardExpiry: "",
        cardCvv: "",
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
        return <LoadingOverlay />;
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

    const addressValid = Boolean(form.firstName.trim() && form.lastName.trim() && form.address.trim());

    const formValid =
        emailValid &&
        phoneValid &&
        addressValid;

    const cardDigits = form.cardNumber.replace(/\s+/g, "");
    const cardValid = /^\d{15,16}$/.test(cardDigits);
    const expiryValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(form.cardExpiry);
    const cvvValid = /^\d{3,4}$/.test(form.cardCvv);
    const paymentValid = cardValid && expiryValid && cvvValid && form.cardName.trim();

    const shippingErrors = showErrors ? {
        email: !emailValid && "Please enter a valid email address.",
        phone: !phoneValid && "Please enter a valid phone number.",
        firstName: !form.firstName.trim() && "Please enter your first name.",
        lastName: !form.lastName.trim() && "Please enter your last name.",
        address: !form.address.trim() && "Please enter your street address.",
    } : {};

    const paymentErrors = showErrors ? {
        cardNumber: !cardValid && "Please enter a valid card number.",
        cardName: !form.cardName.trim() && "Please enter the name on the card.",
        cardExpiry: !expiryValid && "Use the MM/YY format.",
        cardCvv: !cvvValid && "Please enter the security code.",
    } : {};

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

    function goToStep(nextStep, valid) {
        if (!valid) {
            setShowErrors(true);
            return;
        }
        setShowErrors(false);
        run(() => {
            setStep(nextStep);
            window.scrollTo(0, 0);
        });
    }

    function handleSubmit() {
        order.markAsPaid();

        console.log("Created order:", order);

        clearCart();

        navigate("/");
    }

    const getGender = (gender) => GENDER_LABELS[String(gender ?? "").toLowerCase()] ?? gender;

    return (
        <>

            <header className={styles.checkoutHeader}>
                <div className={styles.headerInner}>
                    <div className={styles.brand}>
                        <Link to="/">
                            <img src={logoSvg} alt="NB Logo"/>
                        </Link>
                        <span>Secure checkout</span>
                    </div>
                    <div className={styles.cart}>
                        <Link to="/cart">
                            <img src={cartSvg} alt=""/>
                        </Link>
                    </div>
                </div>
            </header>

            <div className={styles.checkoutWrapper}>

                <nav className={styles.breadcrumbs} aria-label="Checkout steps">
                    {STEPS.map((label, index) => (
                        <button
                            key={label}
                            type="button"
                            className={index === step ? styles.stepActive : ""}
                            disabled={index >= step}
                            onClick={() => goToStep(index, true)}
                        >
                            {label}
                        </button>
                    ))}
                </nav>

                <div className={styles.checkoutGrid}>

                    <div className={styles.checkoutMain}>

                        {step === 0 && (
                            <>
                                {/*Contact Section*/}
                                <section className={`${styles.section} ${styles.contactSection}`}>
                                    <h2>Contact</h2>
                                    <div className={styles.row}>
                                        <Field label="Email" name="email" type="email" autoComplete="email" value={form.email} onChange={handleChange} error={shippingErrors.email}/>
                                        <Field label="Phone number" name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={handleChange} error={shippingErrors.phone}/>
                                    </div>
                                    <label className={styles.newsletter}>
                                        <input name="newsletter" type="checkbox" checked={form.newsletter} onChange={handleChange}/>
                                        <span>
                                            Sign up for email to hear about product launches, exclusive offers and athlete news. By subscribing, I am agreeing to the New Balance <Link to="/privacy-policy">Privacy Policy</Link> and <Link to="/terms">Terms & Conditions</Link>.
                                        </span>
                                    </label>
                                </section>

                                <section className={`${styles.section} ${styles.shippingSection}`}>
                                    <h2>Shipping address</h2>
                                    <div className={styles.thumbs}>
                                        {cartProducts.map(item => (
                                            <img
                                                key={`${item.product.id}-${item.color}-${item.size}`}
                                                src={item.product.images?.[item.color]?.[0]}
                                                alt={item.product.name}
                                            />
                                        ))}
                                    </div>
                                    <div className={styles.row}>
                                        <Field label="First Name" name="firstName" type="text" autoComplete="given-name" value={form.firstName} onChange={handleChange} error={shippingErrors.firstName}/>
                                        <Field label="Last Name" name="lastName" type="text" autoComplete="family-name" value={form.lastName} onChange={handleChange} error={shippingErrors.lastName}/>
                                    </div>
                                    <Field label="Street Address" name="address" type="text" autoComplete="street-address" value={form.address} onChange={handleChange} error={shippingErrors.address}/>
                                </section>

                                <section className={styles.section}>
                                    <h2>Shipping method</h2>
                                    {addressValid ? (
                                        <label className={styles.methodOption}>
                                            <input type="radio" checked readOnly />
                                            <span>
                                                <strong>Standard</strong>
                                                <span className={styles.methodNote}>3-6 business days</span>
                                            </span>
                                            <strong className={styles.methodPrice}>FREE</strong>
                                        </label>
                                    ) : (
                                        <p className={styles.methodHint}>Enter your shipping address to view available shipping methods.</p>
                                    )}
                                </section>

                                <button className={styles.continueBtn} onClick={() => goToStep(1, formValid)}>Continue to Payment</button>
                            </>
                        )}

                        {step === 1 && (
                            <section className={styles.section}>
                                <h2>Payment</h2>
                                <p className={styles.acceptLine}>We accept {PAYMENT_METHODS.join(", ")}.</p>
                                <Field label="Card number" name="cardNumber" inputMode="numeric" autoComplete="cc-number" value={form.cardNumber} onChange={handleChange} error={paymentErrors.cardNumber}/>
                                <Field label="Name on card" name="cardName" type="text" autoComplete="cc-name" value={form.cardName} onChange={handleChange} error={paymentErrors.cardName}/>
                                <div className={styles.row}>
                                    <Field label="Expiration (MM/YY)" name="cardExpiry" inputMode="numeric" autoComplete="cc-exp" value={form.cardExpiry} onChange={handleChange} error={paymentErrors.cardExpiry}/>
                                    <Field label="Security code" name="cardCvv" inputMode="numeric" autoComplete="cc-csc" value={form.cardCvv} onChange={handleChange} error={paymentErrors.cardCvv}/>
                                </div>
                                <button className={styles.continueBtn} onClick={() => goToStep(2, paymentValid)}>Review Order</button>
                            </section>
                        )}

                        {step === 2 && (
                            <section className={styles.section}>
                                <h2>Review and buy</h2>
                                <div className={styles.reviewGrid}>
                                    <div className={styles.reviewBlock}>
                                        <div className={styles.reviewHead}>
                                            <h3>Contact</h3>
                                            <button type="button" onClick={() => goToStep(0, true)}>Edit</button>
                                        </div>
                                        <p>{form.email}</p>
                                        <p>{form.phone}</p>
                                    </div>
                                    <div className={styles.reviewBlock}>
                                        <div className={styles.reviewHead}>
                                            <h3>Shipping address</h3>
                                            <button type="button" onClick={() => goToStep(0, true)}>Edit</button>
                                        </div>
                                        <p>{form.firstName} {form.lastName}</p>
                                        <p>{form.address}</p>
                                        <p>{form.country}</p>
                                    </div>
                                    <div className={styles.reviewBlock}>
                                        <div className={styles.reviewHead}>
                                            <h3>Payment</h3>
                                            <button type="button" onClick={() => goToStep(1, true)}>Edit</button>
                                        </div>
                                        <p>Card ending in {cardDigits.slice(-4)}</p>
                                        <p>{form.cardName}</p>
                                    </div>
                                </div>
                                <button disabled={!formValid || !paymentValid} className={styles.continueBtn} onClick={() => run(handleSubmit)}>Place Order</button>
                            </section>
                        )}

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
                            <span className={styles.taxLabel}><InfoIcon />Total Tax</span>
                            <span>${tax.toFixed(2)}</span>
                        </p>

                        <p className={`${styles.summaryRow} ${styles.orderTotal}`}>
                            <span>Order total</span>
                            <span>${total.toFixed(2)}</span>
                        </p>

                        <h3 className={styles.summaryShipping}>Shipping</h3>

                        <div className={styles.checkoutProducts}>
                            {cartProducts.map(item => (
                                <div
                                    key={`${item.product.id}-${item.color}-${item.size}`}
                                    className={styles.checkoutProduct}
                                >
                                    <img
                                        className={styles.checkoutProductImage}
                                        src={item.product.images?.[item.color]?.[0]}
                                        alt={item.product.name}
                                    />

                                    <div className={styles.checkoutProductInfo}>

                                        <h4>{item.product.name}</h4>

                                        <p>{getGender(item.product.gender)}</p>

                                        <p>Color: {colorMap[item.color] || item.color}</p>

                                        <p>Size: {item.size}</p>

                                        <p>Qty: {item.quantity} @ ${item.product.price.toFixed(2)}</p>

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

            <footer className={styles.checkoutFooter}>
                <div className={styles.accepts}>
                    <span className={styles.acceptsTitle}>We accept:</span>
                    {PAYMENT_METHODS.map(method => (
                        <span key={method} className={styles.acceptBadge}>{method}</span>
                    ))}
                </div>
                <p className={styles.ssl}>SSL Certificate</p>
                <nav className={styles.footerLinks}>
                    {LEGAL_LINKS.map(link => (
                        <Link key={link.to} to={link.to}>{link.label}</Link>
                    ))}
                </nav>
            </footer>

            <LoadingOverlay visible={loading} />
        </>
    )
}

export default Checkout
