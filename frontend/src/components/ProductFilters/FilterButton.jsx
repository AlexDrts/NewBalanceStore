import styles from "./ProductFilters.module.css";

function FilterButton({
                          filterName,
                          value,
                          label,
                          filters,
                          setFilters,
                          color = null
                      }) {

    const isActive = filters[filterName].includes(value);

    const toggleValue = () => {
        setFilters(prev => ({
            ...prev,
            [filterName]: isActive
                ? prev[filterName].filter(v => v !== value)
                : [...prev[filterName], value]
        }));
    };

    return (
        <button
            onClick={toggleValue}
            className={
                color
                    ? `${styles.filterOption} ${styles.colorSwatch} ${isActive ? styles.active : ""}`
                    : `${styles.filterOption} ${isActive ? styles.active : ""}`
            }
            style={color ? { backgroundColor: color } : {}}
        >
            {!color && label}
        </button>
    );
}

export default FilterButton;