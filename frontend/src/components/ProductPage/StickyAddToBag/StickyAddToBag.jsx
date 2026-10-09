import styles from "./StickyAddToBag.module.css";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

function useHeaderOffset() {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const header = document.querySelector(".main-header");
        if (!header) return;

        const update = () => {
            const isFixed = getComputedStyle(header).position === "fixed";
            const isHidden = header.classList.contains("hidden");

            if (isFixed) {
                setOffset(isHidden ? 0 : header.offsetHeight);
            }
            else {
                setOffset(Math.max(0, Math.round(header.getBoundingClientRect().bottom)));
            }
        };

        const observer = new MutationObserver(update);
        observer.observe(header, { attributes: true, attributeFilter: ["class", "style"] });
        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
        update();

        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
        };
    }, []);

    return offset;
}

function StickyAddToBag({ visible, product, image, label, disabled, onClick }) {
    const headerOffset = useHeaderOffset();

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