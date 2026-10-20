import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./InfoPage.module.css";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PRIVACY_KEY = "nb-privacy-opt-out";

function readOptOut() {
    try {
        return localStorage.getItem(PRIVACY_KEY) === "true";
    } catch {
        return false;
    }
}

function writeOptOut(value) {
    try {
        localStorage.setItem(PRIVACY_KEY, String(value));
    } catch {
        return;
    }
}

export function ForgotPasswordForm() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [sentTo, setSentTo] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const value = email.trim();
        if (!EMAIL_PATTERN.test(value)) {
            setError("Please enter a valid email address.");
            return;
        }
        setError("");
        setSentTo(value);
    };

    if (sentTo) {
        return (
            <div className={styles.notice}>
                <p>Thanks! We received a password reset request for <strong>{sentTo}</strong>.</p>
                <p>Online password reset is not available yet. To change your password, please contact Customer Care and we will help you right away.</p>
                <Link to="/help" className={styles.button}>Contact Customer Care</Link>
            </div>
        );
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <label className={styles.field}>
                Email address
                <input
                    className={styles.input}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                />
                {error && <span className={styles.error}>{error}</span>}
            </label>
            <button type="submit" className={styles.submit}>Reset password</button>
            <Link to="/login">Back to log in</Link>
        </form>
    );
}

export function GiftCardBalanceForm() {
    const [card, setCard] = useState("");
    const [pin, setPin] = useState("");
    const [errors, setErrors] = useState({});
    const [checked, setChecked] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const cardDigits = card.replace(/\s+/g, "");
        const nextErrors = {};
        if (!/^\d{16,19}$/.test(cardDigits)) nextErrors.card = "Enter the 16-19 digit card number.";
        if (!/^\d{4,8}$/.test(pin)) nextErrors.pin = "Enter the 4-8 digit PIN.";
        setErrors(nextErrors);
        setChecked(Object.keys(nextErrors).length === 0);
    };

    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <label className={styles.field}>
                    Gift card number
                    <input
                        className={styles.input}
                        inputMode="numeric"
                        value={card}
                        onChange={(e) => { setCard(e.target.value); setChecked(false); }}
                    />
                    {errors.card && <span className={styles.error}>{errors.card}</span>}
                </label>
                <label className={styles.field}>
                    PIN
                    <input
                        className={styles.input}
                        inputMode="numeric"
                        value={pin}
                        onChange={(e) => { setPin(e.target.value); setChecked(false); }}
                    />
                    {errors.pin && <span className={styles.error}>{errors.pin}</span>}
                </label>
                <button type="submit" className={styles.submit}>Check balance</button>
            </form>

            {checked && (
                <div className={styles.notice}>
                    <p>Online balance lookup is not available yet. You can check the balance of your card in any New Balance store or by calling Customer Care at <a href="tel:8005959138">(800) 595-9138</a>.</p>
                </div>
            )}
        </>
    );
}

export function PrivacyChoicesForm() {
    const [optOut, setOptOut] = useState(readOptOut);
    const [saved, setSaved] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        writeOptOut(optOut);
        setSaved(true);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.toggle}>
                <input
                    type="checkbox"
                    checked={optOut}
                    onChange={(e) => { setOptOut(e.target.checked); setSaved(false); }}
                />
                Do not sell or share my personal information
            </label>
            <button type="submit" className={styles.submit}>Save my choice</button>
            {saved && (
                <p className={styles.notice}>
                    {optOut
                        ? "Your choice has been saved. We will not sell or share your personal information from this browser."
                        : "Your choice has been saved. Personalized offers are turned on for this browser."}
                </p>
            )}
        </form>
    );
}
