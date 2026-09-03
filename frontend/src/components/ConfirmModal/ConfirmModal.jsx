import styles from "./ConfirmModal.module.css";

function ConfirmModal({
                          isOpen,
                          title,
                          message,
                          onConfirm,
                          onCancel
                      }) {

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>

            <div className={styles.modal}>

                <h2>{title}</h2>

                <p>{message}</p>

                <div className={styles.buttons}>

                    <button
                        className={styles.cancel}
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                    <button
                        className={styles.confirm}
                        onClick={onConfirm}
                    >
                        Remove
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ConfirmModal;