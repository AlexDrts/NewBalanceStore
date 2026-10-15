import { Fragment, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./FAQ.module.css";
import TopHeader from "../../../../components/TopHeader/TopHeader.jsx";
import MainHeader from "../../../../components/MainHeader/MainHeader.jsx";
import Footer from "../../../../components/Footer/Footer.jsx";
import { FAQ_CATEGORIES, POPULAR_FAQ } from "./faqData.jsx";

const FAQ_LINKS = [
    { label: "Most Popular", to: "/faqs" },
    { label: "Discounts & Promotions", to: "#" },
    { label: "Order Status", to: "/order-status" },
    { label: "Returns", to: "/returns" },
    { label: "Shipping & Delivery", to: "#" },
    { label: "Product & Fit", to: "#" },
    { label: "Shoe Size & Width Guide", to: "/size-guide" },
    { label: "Apparel Size Guide", to: "#" },
    { label: "Sports Bra Size Guide", to: "#" },
    { label: "Care & Maintenance", to: "#" },
    { label: "Payments & Gift Cards", to: "#" },
    { label: "Membership & Log In", to: "#" },
    { label: "Stores", to: "#" },
    { label: "Reconsidered", to: "#" },
];

const HELP_LINKS = [
    { label: "Contact Us", to: "/help" },
    { label: "Start A Return", to: "/returns" },
    { label: "Track Your Order", to: "/order-status" },
    { label: "Find A Store", to: "#" },
    { label: "Log In", to: "/login" },
];

function SideLink({ link }) {
    if (link.to.startsWith("/")) {
        return <Link to={link.to} onClick={() => window.scrollTo(0, 0)}>{link.label}</Link>;
    }
    return <a href={link.to}>{link.label}</a>;
}

function FaqItem({ item, isOpen, onToggle }) {
    const baseId = useId();
    const panelId = `${baseId}-panel`;

    return (
        <section className={styles.faqItem}>
            <h3 className={styles.faqHeading}>
                <button
                    type="button"
                    className={styles.faqTrigger}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={onToggle}
                >
                    <span>{item.question}</span>
                    <svg className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`} viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M2.5 5.5 8 11l5.5-5.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </h3>

            <div id={panelId} className={styles.faqPanel} hidden={!isOpen}>
                {item.answer}
            </div>
        </section>
    );
}

function FAQ() {
    const pageRef = useRef(null);
    const [openIds, setOpenIds] = useState([]);

    const toggle = (id) => {
        setOpenIds((current) => (
            current.includes(id) ? current.filter((openId) => openId !== id) : [...current, id]
        ));
    };

    return (
        <>
            <TopHeader />
            <section ref={pageRef} className={`${styles.faqPage} ${styles.hero}`}>
                <MainHeader theme={"light"} containerRef={pageRef} />
            </section>

            <main className={styles.container}>
                <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
                    <Link to="/" onClick={() => window.scrollTo(0, 0)}>Home</Link>
                    <span className={styles.separator} aria-hidden="true">/</span>
                    <Link to="/help" onClick={() => window.scrollTo(0, 0)}>Customer Care</Link>
                </nav>

                <div className={styles.layout}>
                    <aside className={styles.sidebar}>
                        <h2 className={styles.sideTitle}>FAQs</h2>
                        <ul className={styles.sideList}>
                            {FAQ_LINKS.map((link) => (
                                <li key={link.label}><SideLink link={link} /></li>
                            ))}
                        </ul>

                        <h2 className={styles.sideTitle}>Help</h2>
                        <ul className={styles.sideList}>
                            {HELP_LINKS.map((link) => (
                                <li key={link.label}><SideLink link={link} /></li>
                            ))}
                        </ul>
                    </aside>

                    <div className={styles.content}>
                        <h1 className={styles.title}>Frequently Asked Questions</h1>
                        <span className={styles.titleLine} aria-hidden="true" />

                        <p className={styles.categories}>
                            By category:{" "}
                            {FAQ_CATEGORIES.map((link, index) => (
                                <Fragment key={link.label}>
                                    {index > 0 && <span className={styles.divider} aria-hidden="true"> | </span>}
                                    <SideLink link={link} />
                                </Fragment>
                            ))}
                        </p>

                        <h2 className={styles.faqTitle}>Most Popular FAQs</h2>

                        <div className={styles.faqList}>
                            {POPULAR_FAQ.map((item) => (
                                <FaqItem
                                    key={item.id}
                                    item={item}
                                    isOpen={openIds.includes(item.id)}
                                    onToggle={() => toggle(item.id)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default FAQ;