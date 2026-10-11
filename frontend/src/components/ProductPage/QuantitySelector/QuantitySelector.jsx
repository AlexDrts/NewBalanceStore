import styles from "./QuantitySelector.module.css";

function QuantitySelector({ value, max, onChange, disabled = false }) {
    const upperLimit = Math.max(1, max);
    const canDecrease = !disabled && value > 1;
    const canIncrease = !disabled && value < upperLimit;

    return (
        <div className={styles.quantity}>
            <p className={styles.label} id="quantity-label">Quantity</p>

            <div className={`${styles.stepper} ${disabled ? styles.disabled : ""}`} role="group" aria-labelledby="quantity-label">
                <button
                    type="button"
                    className={styles.button}
                    onClick={() => onChange(value - 1)}
                    disabled={!canDecrease}
                    aria-label="Decrease quantity"
                >
                    −
                </button>

                <span className={styles.value} aria-live="polite">{value}</span>

                <button
                    type="button"
                    className={styles.button}
                    onClick={() => onChange(value + 1)}
                    disabled={!canIncrease}
                    aria-label="Increase quantity"
                >
                    +
                </button>
            </div>
        </div>
    );
}

export default QuantitySelector;