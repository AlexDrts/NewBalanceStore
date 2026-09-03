import styles from "./AddedToBagPopup.module.css";

function AddedToBagPopup() {
    return (
        <div className={styles.popup}>
            <span className={styles.icon}>✔</span>
            <span>Added to bag</span>
        </div>
    );
}

export default AddedToBagPopup;