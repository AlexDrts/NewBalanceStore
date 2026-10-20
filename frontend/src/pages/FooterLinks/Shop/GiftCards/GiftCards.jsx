import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./GiftCards.module.css";
import TopHeader from "../../../../components/TopHeader/TopHeader.jsx";
import MainHeader from "../../../../components/MainHeader/MainHeader.jsx";
import Footer from "../../../../components/Footer/Footer.jsx";
import giftCardImage from "../../../../assets/images/Gift card/NBGiftCardLogo.webp";

const AMOUNTS = [25, 40, 50, 60, 75, 100, 125, 150, 175, 200, 225, 250];

const EGIFT_FIELDS = [
    { name: "senderName", label: "Your Name", type: "text" },
    { name: "senderEmail", label: "Your Email", type: "email" },
    { name: "recipientName", label: "Recipient’s Name", type: "text" },
    { name: "recipientEmail", label: "Recipient’s Email", type: "email" },
    { name: "confirmEmail", label: "Confirm Recipient’s Email", type: "email" },
];

function BagIcon() {
    return (
        <svg className={styles.bagIcon} viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 8h14l-1 13H6L5 8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M9 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.6" />
        </svg>
    );
}

function AmountSelect() {
    return (
        <label className={styles.amount}>
            <span className={styles.amountLabel}>Amount</span>
            <select className={styles.select} defaultValue={25}>
                {AMOUNTS.map((amount) => (
                    <option key={amount} value={amount}>${amount.toFixed(2)}</option>
                ))}
            </select>
        </label>
    );
}

function GiftCards() {
    const pageRef = useRef(null);
    const [tab, setTab] = useState("egift");

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <TopHeader />
            <section ref={pageRef} className={`${styles.giftPage} ${styles.hero}`}>
                <MainHeader theme={"light"} containerRef={pageRef} />
            </section>

            <main className={styles.container}>
                <div className={styles.layout}>
                    <div className={styles.media}>
                        <img className={styles.cardImage} src={giftCardImage} alt="New Balance Gift Card" />
                    </div>

                    <section className={styles.panel}>
                        <h1 className={styles.title}>The Perfect Gift When You Don’t Know Their Size</h1>
                        <p className={styles.intro}>
                            We offer two convenient gift options: an eGift delivered via email or a physical Gift Card sent by mail. Both are valid on footwear, apparel and accessories purchased at <Link to="/">newbalance.com</Link> and participating New Balance stores.
                        </p>

                        <div className={styles.tabs} role="tablist">
                            <button
                                type="button"
                                role="tab"
                                aria-selected={tab === "egift"}
                                className={`${styles.tab} ${tab === "egift" ? styles.tabActive : ""}`}
                                onClick={() => setTab("egift")}
                            >
                                eGift
                            </button>
                            <button
                                type="button"
                                role="tab"
                                aria-selected={tab === "physical"}
                                className={`${styles.tab} ${tab === "physical" ? styles.tabActive : ""}`}
                                onClick={() => setTab("physical")}
                            >
                                Physical Gift Card
                            </button>
                        </div>

                        <form className={styles.form} onSubmit={handleSubmit}>
                            {tab === "egift" && (
                                <>
                                    {EGIFT_FIELDS.map((field) => (
                                        <label key={field.name} className={styles.field}>
                                            <input className={styles.input} type={field.type} name={field.name} placeholder=" " />
                                            <span className={styles.label}>
                                                {field.label}<span className={styles.required}> *</span>
                                            </span>
                                        </label>
                                    ))}

                                    <label className={styles.field}>
                                        <input className={styles.input} type="text" name="message" placeholder=" " />
                                        <span className={styles.label}>Add a message (Optional)</span>
                                    </label>
                                </>
                            )}

                            <AmountSelect key={tab} />

                            <p className={styles.terms}>
                                By clicking Add to bag, you confirm that you have read, understand and accept our <Link to="/gift-card-terms">Gift Card Terms &amp; Conditions</Link>, and <Link to="/privacy-policy">Privacy Policy.</Link>
                            </p>

                            <button type="submit" className={styles.addButton}>
                                Add to bag <BagIcon />
                            </button>
                        </form>

                        <p className={styles.balanceText}>Need to know the amount left on your card?</p>
                        <Link to="/gift-card-balance" className={styles.balanceButton}>Check balance</Link>
                    </section>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default GiftCards;