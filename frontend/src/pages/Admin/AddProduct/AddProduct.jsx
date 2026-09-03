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
    const [inStock, setInStock] = useState(true);

    // Variants
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);

    // Images stored per color
    const [colorImages, setColorImages] = useState({});

    const availableColors = [
        "Black", "White", "Red", "Grey", "Blue",
        "Green", "Pink", "Tan", "Orange", "Purple"
    ];

    const footwearSizes = ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5"];
    const clothingSizes = ["XS", "S", "M", "L", "XL", "2XL"];

    const activeSizesList = (category === "Clothing" || category === "Accessories") ? clothingSizes : footwearSizes;

    // Toggle Colors & manage image key cleanup
    const toggleColor = (color) => {
        const colorKey = color.toLowerCase();

        setSelectedColors((prev) => {
            if(prev.includes(colorKey)) {
                // Remove images for this color when deselected
                setColorImages((prevImgs) => {
                    const newImgs = { ...prevImgs };
                    delete newImgs[colorKey];
                    return newImgs;
                });
                return prev.filter((c) => c !== colorKey);
            }
            return [...prev, colorKey];
        });
    };

    // Toggle Sizes
    const toggleSize = (size) => {
        setSelectedSizes((prev) => {
            if(prev.includes(size)) {
                return prev.filter((s) => s !== size);
            }
            return [...prev, size];
        });
    };

    // Category change handler (resets sizes if switching between footwear & clothing)
    const handleCategoryChange = (e) => {
        const newCategory = e.target.value;
        setCategory(newCategory);
        setSelectedSizes([]);
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

        // Convert string sizes to numbers if footwear
        const formattedSizes = selectedSizes.map((s) => {
            const num = parseFloat(s);
            return isNaN(num) ? s : num;
        });

        const productData = {
            id: Date.now(),
            featured: false,
            name: productName,
            price: parseFloat(price) || 0,
            oldPrice: oldPrice ? parseFloat(oldPrice) : null,
            gender: gender,
            type: category === "Shoes" ? "Footwear" : "Clothing",
            category: category,
            activity: activity,
            description: description,
            images: colorImages,
            colors: selectedColors,
            sizes: formattedSizes,
            isNew: isNew,
            inStock: inStock,
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

                                <label className={styles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        checked={inStock}
                                        onChange={(e) => setInStock(e.target.checked)}
                                    />
                                    <span>In Stock</span>
                                </label>
                            </div>
                        </div>

                        {/* Section 2: Colors & Sizes */}
                        <div className={styles.card}>
                            <h2 className={styles.cardTitle}>Variants</h2>

                            <div className={styles.fieldGroup}>
                                <label className={styles.label}>Colors</label>
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

                            <div className={styles.fieldGroup}>
                                <label className={styles.label}>
                                    Sizes ({category === "Shoes" ? "Footwear" : "Clothing"})
                                </label>
                                <div className={styles.chipGroup}>
                                    {activeSizesList.map((size) => (
                                        <button
                                            key={size}
                                            type="button"
                                            className={`${styles.chip} ${
                                                selectedSizes.includes(size) ? styles.chipActive : ""
                                            }`}
                                            onClick={() => toggleSize(size)}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Images per Color */}
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