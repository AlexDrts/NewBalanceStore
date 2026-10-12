import styles from "./StickyAddToBag.module.css";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

function useHeaderOffset(active) {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        if (!active) return;

        let frame;
        const follow = () => {
            const header = document.querySelector(".main-header");
            const bottom = header ? Math.max(0, Math.round(header.getBoundingClientRect().bottom)) : 0;
            setOffset(current => (current === bottom ? current : bottom));
            frame = requestAnimationFrame(follow);
        };

        frame = requestAnimationFrame(follow);
        return () => cancelAnimationFrame(frame);
    }, [active]);

    return offset;
}

function StickyAddToBag({ visible, product, image, label, disabled, onClick }) {
    const headerOffset = useHeaderOffset(visible);

    return createPortal(
        <div
            className={`${styles.sticky} ${visible ? styles.visible : ""}`}
            style={{ "--sticky-top": `${headerOffset}px` }}
            aria-hidden={!visible}
        >
            <div className={styles.thumb}>
                {image && <img src={image} alt="" />}
            </div>

            <div className={styles.info}>
                <p className={styles.name}>{product.name}</p>
                <p className={styles.gender}>{product.gender}</p>
            </div>

            <button
                type="button"
                className={styles.button}
                onClick={onClick}
                disabled={disabled}
                tabIndex={visible ? 0 : -1}
            >
                {label}
                <BagIcon />
            </button>
        </div>,
        document.body
    );
}

function BagIcon() {
    return (
        <svg className={styles.icon} width="18" height="22" viewBox="0 0 16 18" fill="none" aria-hidden="true">
            <path d="M1.5 5.5h13l-1 11h-11l-1-11Z" stroke="currentColor" strokeWidth="1.1" />
            <path d="M5 7V4a3 3 0 0 1 6 0v3" stroke="currentColor" strokeWidth="1.1" />
        </svg>
    );
}

export default StickyAddToBag;