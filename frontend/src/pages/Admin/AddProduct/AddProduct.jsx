import { useState, useRef } from "react";
import styles from "./AddProduct.module.css";
import TopHeader from "../../../components/TopHeader/TopHeader.jsx";
import MainHeader from "../../../components/MainHeader/MainHeader.jsx";
import Footer from "../../../components/Footer/Footer.jsx";
import { saveProduct } from "../../../services/localStorageService.js";

function AddProduct() {
    const pageRef = useRef(null);

    // Form fields
    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Shoes");
    const [gender, setGender] = useState("Unisex");
    const [activity, setActivity] = useState("Lifestyle");
    const [price, setPrice] = useState("");
    const [oldPrice, setOldPrice] = useState("");

    // Status Flags
    const [isNew, setIsNew] = useState(true);

    // Variants
    const [selectedColors, setSelectedColors] = useState([]);
    const [colorVariants, setColorVariants] = useState({});

    // Images stored per color
    const [colorImages, setColorImages] = useState({});

    const availableColors = [
        "Black", "White", "Red", "Grey", "Blue",
        "Green", "Pink", "Tan", "Orange", "Purple"
    ];

    const footwearSizes = [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12, 12.5];
    const clothingSizes = ["XS", "S", "M", "L", "XL", "2XL"];

    const activeSizesList = (category === "Clothing" || category === "Accessories") ? clothingSizes : footwearSizes;

    // Toggle Colors & manage image key cleanup
    const toggleColor = (color) => {
        const colorKey = color.toLowerCase();

        setSelectedColors((prev) => {
            if(prev.includes(colorKey)) {
                // Remove images
                setColorImages((prevImgs) => {
                    const newImgs = { ...prevImgs };
                    delete newImgs[colorKey];
                    return newImgs;
                });
                // Remove variants
                setColorVariants((prevVariants) => {
                    const newVariants = { ...prevVariants };
                    delete newVariants[colorKey];
                    return newVariants;
                });
                return prev.filter((c) => c !== colorKey);
            }
            return [...prev, colorKey];
        });
    };

    //  Toggle Size for a specific color
    const toggleSizeForColor = (colorKey, size) => {
        setColorVariants((prev) => {
            const currentColorData = prev[colorKey] || {};
            const newColorData = { ...currentColorData };

            if (size in newColorData) {
                // Deselect size
                delete newColorData[size];
            }
            else {
                // Select size with default quantity 1
                newColorData[size] = 1;
            }

            return {
                ...prev,
                [colorKey]: newColorData
            };
        });
    };

    // Update Quantity for specific color and size
    const handleQuantityChange = (colorKey, size, quantity) => {
        if (quantity === "") {
            setColorVariants((prev) => ({
                ...prev,
                [colorKey]: {
                    ...(prev[colorKey] || {}),
                    [size]: ""
                }
            }));
            return;
        }

        const parsedQty = Math.max(0, parseInt(quantity, 10) || 0);

        setColorVariants((prev) => ({
            ...prev,
            [colorKey]: {
                ...(prev[colorKey] || {}),
                [size]: parsedQty
            }
        }));
    };


    // Category change handler (resets variants if switching categories)
    const handleCategoryChange = (e) => {
        const newCategory = e.target.value;
        setCategory(newCategory);
        setColorVariants({});
    };

    // Convert file to Base64
    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    // Handle Image Upload for specific color
    const handleImageUpload = async (e, colorKey) => {
        const files = Array.from(e.target.files);
        if(!files.length) return;

        const base64Images = await Promise.all(files.map((file) => fileToBase64(file)));

        setColorImages((prev) => {
            const currentList = prev[colorKey] || [];
            return {
                ...prev,
                [colorKey]: [...currentList, ...base64Images].slice(0, 8), // Max 8 per color
            };
        });
    };

    // Remove Image for specific color
    const handleRemoveImage = (colorKey, indexToRemove) => {
        setColorImages((prev) => ({
            ...prev,
            [colorKey]: prev[colorKey].filter((_, index) => index !== indexToRemove),
        }));
    };

    // Submit Form
    const handleSubmit = (e) => {
        e.preventDefault();

        const variants = [];

        // Build flat array of variants with exact quantity
        selectedColors.forEach((colorKey) => {
            const sizesData = colorVariants[colorKey] || {};

            Object.entries(sizesData).forEach(([size, quantity]) => {
                variants.push({
                    color: colorKey,
                    size: isNaN(Number(size)) ? size : Number(size),
                    quantity: Number(quantity)
                });
            });
        });


        const productData = {
            id: Date.now(),
            name: productName,
            price: parseFloat(price) || 0,
            oldPrice: oldPrice ? parseFloat(oldPrice) : null,
            gender: gender,
            type: category === "Shoes" ? "Footwear" : category === "Clothing" ? "Clothing" : "Accessories",
            category: category,
            activity: activity,
            description: description,
            images: colorImages,
            colors: selectedColors,
            isNew: isNew,
            variants
        };

        saveProduct(productData);

        console.log("Created Product Data Object:", productData);
        alert("Product added successfully!");
    };

    return (
        <>
            <TopHeader />
            <section ref={pageRef} className={`${styles.addProduct} ${styles.hero}`}>
                <MainHeader theme={"light"} containerRef={pageRef} />
            </section>

            <main className={styles.container}>
                <div className={styles.formWrapper}>
                    <h1 className={styles.pageTitle}>Add Product</h1>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        {/* Section 1: Product Information */}
                        <div className={styles.card}>
                            <h2 className={styles.cardTitle}>Product Information</h2>

                            <div className={styles.fieldGroup}>
                                <label className={styles.label}>
                                    Product name <span className={styles.required}>*</span>
                                </label>
                                <div className={styles.inputWithCounter}>
                                    <input
                                        type="text"
                                        placeholder="e.g. 9060"
                                        maxLength={150}
                                        value={productName}
                                        onChange={(e) => setProductName(e.target.value)}
                                        required
                                    />
                                    <span className={styles.counter}>{productName.length}/150</span>
                                </div>
                            </div>

                            <div className={styles.fieldGroup}>
                                <label className={styles.label}>
                                    Description <span className={styles.required}>*</span>
                                </label>
                                <textarea
                                    rows={4}
                                    placeholder="Write a detailed description of the product..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </div>

                            <div className={styles.rowTwoCols}>
                                <div className={styles.fieldGroup}>
                                    <label className={styles.label}>
                                        Category <span className={styles.required}>*</span>
                                    </label>
                                    <select value={category} onChange={handleCategoryChange} required>
                                        <option value="Shoes">Shoes</option>
                                        <option value="Clothing">Clothing</option>
                                        <option value="Accessories">Accessories</option>
                                    </select>
                                </div>

                                <div className={styles.fieldGroup}>
                                    <label className={styles.label}>
                                        Gender <span className={styles.required}>*</span>
                                    </label>
                                    <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                                        <option value="Unisex">Unisex</option>
                                        <option value="Men">Men</option>
                                        <option value="Women">Women</option>
                                    </select>
                                </div>
                            </div>

                            <div className={styles.fieldGroup}>
                                <label className={styles.label}>
                                    Activity <span className={styles.required}>*</span>
                                </label>
                                <select value={activity} onChange={(e) => setActivity(e.target.value)} required>
                                    <option value="Lifestyle">Lifestyle</option>
                                    <option value="Running">Running</option>
                                    <option value="Training">Training</option>
                                    <option value="Soccer">Soccer</option>
                                    <option value="Basketball">Basketball</option>
                                    <option value="Tennis">Tennis</option>
                                </select>
                            </div>

                            <div className={styles.rowTwoCols}>
                                <div className={styles.fieldGroup}>
                                    <label className={styles.label}>
                                        Price ($) <span className={styles.required}>*</span>
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        placeholder="159.99"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className={styles.fieldGroup}>
                                    <label className={styles.label}>Old price ($)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        placeholder="199.99"
                                        value={oldPrice}
                                        onChange={(e) => setOldPrice(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Flags: isNew & inStock */}
                            <div className={styles.checkboxGroup}>
                                <label className={styles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        checked={isNew}
                                        onChange={(e) => setIsNew(e.target.checked)}
                                    />
                                    <span>New Release</span>
                                </label>
                            </div>
                        </div>

                        {/* Section 2: Colors Selection */}
                        <div className={styles.card}>
                            <h2 className={styles.cardTitle}>Select Colors</h2>
                            <div className={styles.fieldGroup}>
                                <div className={styles.chipGroup}>
                                    {availableColors.map((color) => {
                                        const colorKey = color.toLowerCase();
                                        const isActive = selectedColors.includes(colorKey);
                                        return (
                                            <button
                                                key={color}
                                                type="button"
                                                className={`${styles.chip} ${isActive ? styles.chipActive : ""}`}
                                                onClick={() => toggleColor(color)}
                                            >
                                                {color}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Sizes & Quantities per Color */}
                        {selectedColors.length > 0 && (
                            <div className={styles.card}>
                                <h2 className={styles.cardTitle}>Sizes & Stock per Color</h2>
                                <p className={styles.cardSubtitle}>
                                    Select available sizes and set stock quantity for each selected color.
                                </p>

                                {selectedColors.map((colorKey) => {
                                    const selectedSizesData = colorVariants[colorKey] || {};

                                    return (
                                        <div key={colorKey} className={styles.colorVariantsBlock}>
                                            <h3 className={styles.colorHeading}>
                                                Color: {colorKey.toUpperCase()}
                                            </h3>

                                            {/* Size Chips */}
                                            <div className={styles.fieldGroup}>
                                                <label className={styles.label}>Select Sizes:</label>
                                                <div className={styles.chipGroup}>
                                                    {activeSizesList.map((size) => {
                                                        const isSelected = size in selectedSizesData;
                                                        return (
                                                            <button
                                                                key={size}
                                                                type="button"
                                                                className={`${styles.chip} ${isSelected ? styles.chipActive : ""}`}
                                                                onClick={() => toggleSizeForColor(colorKey, size)}
                                                            >
                                                                {size}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            {/* Quantity Inputs for active sizes */}
                                            {Object.keys(selectedSizesData).length > 0 && (
                                                <div className={styles.quantitiesGrid}>
                                                    {Object.entries(selectedSizesData).map(([size, qty]) => (
                                                        <div key={size} className={styles.quantityItem}>
                                                            <span className={styles.sizeLabel}>Size {size}:</span>
                                                            <input
                                                                type="number"
                                                                min="0"
                                                                value={qty}
                                                                onChange={(e) => handleQuantityChange(colorKey, size, e.target.value)}
                                                                placeholder="Qty"
                                                                className={styles.qtyInput}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Section 4: Images per Color */}
                        {selectedColors.length > 0 && (
                            <div className={styles.card}>
                                <h2 className={styles.cardTitle}>Images</h2>
                                <p className={styles.cardSubtitle}>
                                    The first image will be the product cover for that color.
                                </p>

                                {selectedColors.map((colorKey) => {
                                    const imgs = colorImages[colorKey] || [];
                                    const emptySlots = Math.max(0, 4 - imgs.length);

                                    return (
                                        <div key={colorKey} className={styles.colorImagesSection}>
                                            <h3 className={styles.colorHeading}>
                                                {colorKey.toUpperCase()}
                                            </h3>

                                            <div className={styles.imageGrid}>
                                                <label className={styles.uploadBox}>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        multiple
                                                        onChange={(e) => handleImageUpload(e, colorKey)}
                                                        className={styles.fileInput}
                                                    />
                                                    <div className={styles.uploadContent}>
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                                            <polyline points="21 15 16 10 5 21"></polyline>
                                                        </svg>
                                                        <span>+ Add Photo</span>
                                                    </div>
                                                </label>

                                                {imgs.map((url, idx) => (
                                                    <div key={idx} className={styles.imagePreviewBox}>
                                                        <img src={url} alt={`${colorKey} ${idx}`} />
                                                        {idx === 0 && (
                                                            <span className={styles.coverBadge}>Cover</span>
                                                        )}
                                                        <button
                                                            type="button"
                                                            className={styles.removeImgBtn}
                                                            onClick={() => handleRemoveImage(colorKey, idx)}
                                                        >
                                                            ✕
                                                        </button>
                                                    </div>
                                                ))}

                                                {Array.from({ length: emptySlots }).map((_, i) => (
                                                    <div key={i} className={styles.emptyBox}>
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2">
                                                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                                            <polyline points="21 15 16 10 5 21"></polyline>
                                                        </svg>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Submit Button Container */}
                        <div className={styles.actionContainer}>
                            <button type="submit" className={styles.submitBtn}>
                                Add Product
                            </button>
                        </div>
                    </form>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default AddProduct;