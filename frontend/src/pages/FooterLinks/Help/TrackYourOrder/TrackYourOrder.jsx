import { useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./TrackYourOrder.module.css";
import TopHeader from "../../../../components/TopHeader/TopHeader.jsx";
import MainHeader from "../../../../components/MainHeader/MainHeader.jsx";
import Footer from "../../../../components/Footer/Footer.jsx";
import FaqList from "../../../../components/FaqAccordion/FaqList.jsx";
import { getCurrentUser } from "../../../../services/api/authService.js";
import { getTrackFaq } from "./trackFaq.jsx";

function TrackYourOrder() {
    const pageRef = useRef(null);
    const accountLink = getCurrentUser() ? "/account" : "/login";
    const faq = getTrackFaq(accountLink, styles.plainList);

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <TopHeader />
            <section ref={pageRef} className={`${styles.trackPage} ${styles.hero}`}>
                <MainHeader theme={"light"} containerRef={pageRef} />
            </section>

            <main className={styles.container}>
                <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
                    <Link to="/" onClick={() => window.scrollTo(0, 0)}>Home</Link>
                    <span className={styles.separator} aria-hidden="true">/</span>
                    <span aria-current="page">Order Status</span>
                </nav>

                <div className={styles.content}>
                    <h1 className={styles.title}>Order Status</h1>
                    <p className={styles.subtitle}>Quickly check your order status or start a return.</p>

                    <form id="order-form" className={styles.form} onSubmit={handleSubmit} noValidate>
                        <label className={styles.field}>
                            <input className={styles.input} type="text" name="orderNumber" autoComplete="off" placeholder=" " />
                            <span className={styles.label}>Order Number</span>
                        </label>

                        <label className={styles.field}>
                            <input className={styles.input} type="text" name="lastName" autoComplete="family-name" placeholder=" " />
                            <span className={styles.label}>Billing Last Name</span>
                        </label>

                        <label className={styles.field}>
                            <input className={styles.input} type="text" name="zipCode" inputMode="numeric" autoComplete="postal-code" placeholder=" " />
                            <span className={styles.label}>Shipping ZIP Code</span>
                        </label>

                        <button type="submit" className={styles.submit}>Track Order</button>
                    </form>

                    <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>

                    <FaqList items={faq} styles={styles} />
                </div>
            </main>

            <Footer />
        </>
    );
}

export default TrackYourOrder;