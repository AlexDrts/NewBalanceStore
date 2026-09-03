import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Admin.module.css";
import TopHeader from "../../../components/TopHeader/TopHeader.jsx";
import MainHeader from "../../../components/MainHeader/MainHeader.jsx";
import Footer from "../../../components/Footer/Footer.jsx";
import { removeStorage } from "../../../utils/localStorage.js";

function Admin() {
    const pageRef = useRef(null);
    const navigate = useNavigate();

    const handleLogout = () => {
        removeStorage("adminCredentials");
        navigate("/login");
    };

    return (
        <>
            <TopHeader />
            <section ref={pageRef} className={`${styles.adminPage} ${styles.hero}`}>
                <MainHeader theme={"light"} containerRef={pageRef} />
            </section>

            <main className={styles.adminContainer}>
                <div className={styles.dashboardCard}>
                    <div className={styles.dashboardHeader}>
                        <h1 className={styles.title}>Admin Dashboard</h1>

                        <button
                            type="button"
                            className={styles.logoutBtn}
                            onClick={handleLogout}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                <polyline points="16 17 21 12 16 7"></polyline>
                                <line x1="21" y1="12" x2="9" y2="12"></line>
                            </svg>
                            Logout
                        </button>
                    </div>

                    <div className={styles.cardsGrid}>
                        <button
                            type="button"
                            className={styles.actionCard}
                            onClick={() => navigate("/add-product")}
                        >
                            <div className={styles.iconWrapper}>
                                <svg width="33px" height="33px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 12H20M12 4V20" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                            </div>
                            <h2 className={styles.cardTitle}>Add Product</h2>
                            <p className={styles.cardDesc}>Create new product</p>
                        </button>

                        <button
                            type="button"
                            className={styles.actionCard}
                            onClick={() => navigate("/manage-products")}
                        >
                            <div className={styles.iconWrapper}>
                                <svg width="33px" height="33px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M11.5144 1.12584C11.8164 0.958052 12.1836 0.958052 12.4856 1.12584L21.4845 6.12522C21.4921 6.12942 21.4996 6.13372 21.5071 6.13813C21.8125 6.31781 22 6.64568 22 7V17C22 17.3632 21.8031 17.6978 21.4856 17.8742L12.4856 22.8742C12.1791 23.0445 11.8059 23.0416 11.5022 22.8673L2.51436 17.874C2.19689 17.6977 2 17.3631 2 16.9999V7C2 6.64568 2.18749 6.3177 2.49287 6.13802L2.5073 6.13784L2.51436 6.12584L11.5144 1.12584ZM12.0001 10.856L5.05923 6.99995L12 3.14396L18.9409 7L12.0001 10.856ZM4 8.69951V16.4115L11 20.3004V12.5884L4 8.69951ZM13 12.5884V20.3005L20 16.4116V8.69951L13 12.5884Z" fill="#0F0F0F"></path>
                                </svg>
                            </div>
                            <h2 className={styles.cardTitle}>Manage Products</h2>
                            <p className={styles.cardDesc}>Edit / Delete product</p>
                        </button>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default Admin;