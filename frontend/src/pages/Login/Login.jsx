import { useState, useRef, useEffect } from "react";
import styles from "./Login.module.css";
import TopHeader from "../../components/TopHeader/TopHeader.jsx";
import MainHeader from "../../components/MainHeader/MainHeader.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { useNavigate } from "react-router-dom";
import { getStorage, removeStorage, setStorage } from "../../utils/localStorage.js";

function Login() {
    const pageRef = useRef(null);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("login");
    const [showPassword, setShowPassword] = useState(false);

    const [form, setForm] = useState({
        email: "",
        phone: "",
        firstName: "",
        lastName: "",
        password: "",
        rememberMe: true,
    });

    useEffect(() => {
        const credentials = getStorage("adminCredentials");
        if(credentials && credentials.email === "admin" && credentials.password === "admin123") {
            navigate("/admin");
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);

    const phoneValid = /^\+?[0-9\s()-]{10,20}$/.test(form.phone);

    const loginFormValid =
        form.email === "admin" &&
        form.password.trim() !== "" ||
        emailValid &&
        form.password.trim() !== "";

    const createAccountFormValid =
        emailValid &&
        form.firstName.trim() !== "" &&
        form.lastName.trim() !== "" &&
        form.password &&
        phoneValid;

    function handleLogin() {
        if(!loginFormValid) return;
        if(form.email === "admin" && form.password === "admin123") {
            if(form.rememberMe) {
                setStorage("adminCredentials", {
                    email: form.email,
                    password: form.password,
                });
            }
            else {
                removeStorage("adminCredentials");
            }

            navigate("/admin");
        }
        else {
            alert("Invalid login or password");
        }
    }

    function handleCreateAccount() {
        if(!createAccountFormValid) return;
        console.log(form);
    }

    return (
        <>
            <TopHeader />
            <section ref={pageRef} className={`${styles.loginPage} ${styles.hero}`}>
                <MainHeader theme={"light"} containerRef={pageRef} />
            </section>

            <main className={styles.authContainer}>
                <div className={styles.authCard}>
                    <div className={styles.banner}>
                        Members get exclusive offers, free returns, & more.
                    </div>

                    <div className={styles.tabToggle}>
                        <button
                            type="button"
                            className={`${styles.tabBtn} ${activeTab === "login" ? styles.activeTab : ""}`}
                            onClick={() => setActiveTab("login")}
                        >
                            Log in
                        </button>
                        <button
                            type="button"
                            className={`${styles.tabBtn} ${activeTab === "register" ? styles.activeTab : ""}`}
                            onClick={() => setActiveTab("register")}
                        >
                            Create account
                        </button>
                    </div>

                    {activeTab === "login" ? (
                        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                            <div className={styles.inputGroup}>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Email or username"
                                    value={form.email}
                                    onChange={handleChange}
                                    noValidate
                                    required
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    type="button"
                                    className={styles.eyeBtn}
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label="Toggle password visibility"
                                >
                                    <svg width="30px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <path d="M3.27489 15.2957C2.42496 14.1915 2 13.6394 2 12C2 10.3606 2.42496 9.80853 3.27489 8.70433C4.97196 6.49956 7.81811 4 12 4C16.1819 4 19.028 6.49956 20.7251 8.70433C21.575 9.80853 22 10.3606 22 12C22 13.6394 21.575 14.1915 20.7251 15.2957C19.028 17.5004 16.1819 20 12 20C7.81811 20 4.97196 17.5004 3.27489 15.2957Z" stroke="#000000" strokeWidth="1.5"></path>
                                            <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="#000000" strokeWidth="1.5"></path>
                                        </g>
                                    </svg>
                                </button>
                            </div>

                            <div className={styles.rowBetween}>
                                <label className={styles.checkboxLabel}>
                                    <input
                                        name="rememberMe"
                                        type="checkbox"
                                        checked={form.rememberMe}
                                        onChange={handleChange}
                                    />
                                    Remember me
                                </label>
                                <a href="#" className={styles.forgotLink}>Forgot password</a>
                            </div>

                            <button type="submit" className={styles.submitBtn} onClick={handleLogin}>
                                Log in
                            </button>

                            <p className={styles.termsText}>
                                By logging into my account, I agree to New Balance's{" "}
                                <a href="#" className={styles.link}>Terms & Conditions</a> and{" "}
                                <a href="#" className={styles.link}>Privacy Policy</a>.
                            </p>
                        </form>
                    ) : (
                        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                            <div className={styles.inputGroup}>
                                <input
                                    name="firstName"
                                    type="text"
                                    placeholder="First name"
                                    value={form.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <input
                                    name="lastName"
                                    type="text"
                                    placeholder="Last name"
                                    value={form.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required />
                            </div>

                            <div className={styles.inputGroup}>
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    type="button"
                                    className={styles.eyeBtn}
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label="Toggle password visibility"
                                >
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                </button>
                            </div>

                            <div className={styles.inputGroup}>
                                <input
                                    name="phone"
                                    type="tel"
                                    placeholder="Mobile number"
                                    value={form.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className={styles.passwordRequirements}>
                                <strong>Password requirements:</strong>
                                <ul>
                                    <li>Minimum 8 characters</li>
                                    <li>At least one capital letter</li>
                                    <li>At least one number</li>
                                    <li>At least one special character (! @ # $ % &)</li>
                                    <li>Cannot contain your name or email address</li>
                                    <li>No repeating characters</li>
                                </ul>
                            </div>

                            <label className={styles.checkboxLabel}>
                                <input type="checkbox" />
                                <p>
                                    Sign up for email to hear about product launches, exclusive offers and athlete news.
                                </p>
                            </label>

                            <label className={styles.checkboxLabel}>
                                <input type="checkbox" required />
                                <p>
                                    By checking the box, you are creating an account with New Balance and you agree to the{" "}
                                    <a href="#" className={styles.link}>Terms & Conditions</a> and{" "}
                                    <a href="#" className={styles.link}>Privacy Policy</a>.
                                </p>

                            </label>

                            <button type="submit" className={styles.submitBtn} onClick={handleCreateAccount}>
                                Create account
                            </button>
                        </form>
                    )}
                </div>
            </main>

            <Footer />
        </>
    );
}

export default Login;