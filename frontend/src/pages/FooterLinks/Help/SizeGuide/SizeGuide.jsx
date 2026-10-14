import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SizeGuide.module.css";
import TopHeader from "../../../../components/TopHeader/TopHeader.jsx";
import MainHeader from "../../../../components/MainHeader/MainHeader.jsx";
import Footer from "../../../../components/Footer/Footer.jsx";
import { SIZE_TABLES, SIZE_TIPS } from "./sizeData.js";

const FAQ_LINKS = [
    { label: "Most Popular", to: "#" },
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

function SizeTable({ columns, rows }) {
    return (
        <div className={styles.tableWrap}>
            <table className={styles.table}>
                <thead>
                <tr>
                    {columns.map((column) => (
                        <th key={column} scope="col">{column}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            cellIndex === 0
                                ? <th key={cellIndex} scope="row">{cell}</th>
                                : <td key={cellIndex}>{cell}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

function SizeSection({ table }) {
    const [tab, setTab] = useState("size");

    return (
        <section className={styles.section} aria-labelledby={`${table.id}-title`}>
            <h2 id={`${table.id}-title`} className={styles.sectionTitle}>{table.title}</h2>

            <div className={styles.tabs} role="tablist">
                <button
                    type="button"
                    role="tab"
                    aria-selected={tab === "size"}
                    className={`${styles.tab} ${tab === "size" ? styles.tabActive : ""}`}
                    onClick={() => setTab("size")}
                >
                    Find your size
                </button>
                <button
                    type="button"
                    role="tab"
                    aria-selected={tab === "width"}
                    className={`${styles.tab} ${tab === "width" ? styles.tabActive : ""}`}
                    onClick={() => setTab("width")}
                >
                    Find your width
                </button>
            </div>

            {tab === "size"
                ? <SizeTable columns={table.columns} rows={table.rows} />
                : <SizeTable columns={table.widthColumns} rows={table.widthRows} />}

            {table.download && (
                <a href="#" className={styles.download}>{table.download}</a>
            )}
        </section>
    );
}

function SizeGuide() {
    const pageRef = useRef(null);

    return (
        <>
            <TopHeader />
            <section ref={pageRef} className={`${styles.sizePage} ${styles.hero}`}>
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
                        <h1 className={styles.title}>Size &amp; Width Guide</h1>
                        <span className={styles.titleLine} aria-hidden="true" />

                        {SIZE_TABLES.map((table) => (
                            <SizeSection key={table.id} table={table} />
                        ))}

                        <section className={styles.tips}>
                            <h2 className={styles.tipsTitle}>Tips For Finding Your Perfect Size</h2>
                            <ul className={styles.tipsList}>
                                {SIZE_TIPS.map((tip) => (
                                    <li key={tip}>{tip}</li>
                                ))}
                            </ul>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default SizeGuide;