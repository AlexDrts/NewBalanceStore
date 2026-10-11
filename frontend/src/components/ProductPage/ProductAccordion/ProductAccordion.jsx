import styles from "./ProductAccordion.module.css";
import { useId, useState } from "react";

function ProductAccordion({ items }) {
    const [openIds, setOpenIds] = useState(
        () => items.filter(item => item.defaultOpen).map(item => item.id)
    );
    const baseId = useId();

    const toggle = (id) => {
        setOpenIds(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    return (
        <div className={styles.accordion}>
            {items.map(item => {
                const isOpen = openIds.includes(item.id);
                const panelId = `${baseId}-${item.id}`;

                return (
                    <section key={item.id} className={styles.item}>
                        <h3 className={styles.heading}>
                            <button
                                type="button"
                                className={styles.trigger}
                                aria-expanded={isOpen}
                                aria-controls={panelId}
                                onClick={() => toggle(item.id)}
                            >
                                <span>{item.title}</span>
                                <span className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`} aria-hidden="true" />
                            </button>
                        </h3>

                        <div
                            id={panelId}
                            className={`${styles.panel} ${isOpen ? styles.panelOpen : ""}`}
                            hidden={!isOpen}
                        >
                            {item.content}
                        </div>
                    </section>
                );
            })}
        </div>
    );
}

export default ProductAccordion;