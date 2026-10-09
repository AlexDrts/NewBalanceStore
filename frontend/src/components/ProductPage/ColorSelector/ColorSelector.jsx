import styles from "./ColorSelector.module.css";
import { formatColorName } from "../../../utils/productFormat.js";

function ColorSelector({ product, selectedColor, onSelect }) {
    return (
        <div className={styles.colorSelector}>
            <p className={styles.label}>
                Color: <span>{formatColorName(selectedColor)}</span>
            </p>

            <div className={styles.swatches} role="radiogroup" aria-label="Color">
                {product.colors.map(color => {
                    const isActive = color === selectedColor;
                    const inStock = product.isColorAvailable(color);

                    return (
                        <button
                            type="button"
                            key={color}
                            role="radio"
                            aria-checked={isActive}
                            aria-label={`${formatColorName(color)}${inStock ? "" : " — out of stock"}`}
                            title={formatColorName(color)}
                            onClick={() => onSelect(color)}
                            className={`${styles.swatch} ${isActive ? styles.active : ""} ${!inStock ? styles.soldOut : ""}`}
                        >
                            <img src={product.getMainImage(color)} alt="" loading="lazy" />
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default ColorSelector;