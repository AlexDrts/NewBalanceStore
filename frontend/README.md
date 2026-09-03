# New Balance Store

A full-featured e-commerce web application inspired by the official **New Balance** design. The project includes a functional home page, product catalog with multi-criteria filtering and sorting, interactive product drawer for quick preview, shopping cart, checkout workflow, authentication system, and administrative panel.

---

## 🛠 Tech Stack

The project is built using modern frontend technologies and design patterns:

* **Core & UI:** React (React.js), JavaScript (ES6+), HTML5, CSS Modules
* **Build Tool:** Vite
* **Routing:** React Router (SPA)
* **Testing:** Vitest (Unit testing for business logic)
* **State Management & Patterns:** React Context API (`useCart`), Reducers, Factory Pattern (`ProductFactory`)
* **Data Persistence:** LocalStorage API

---

## ✨ Features

* **📦 Product Catalog & Quick View:**
  * Displays footwear, apparel, and accessories.
  * **Product Drawer:** Dynamic quick-view panel to select sizes, colors, and add items to the cart without leaving the main page.
* **🔍 Advanced Filtering & Sorting:**
  * **Category Filter:** Shoes, Clothing, Accessories.
  * **Sizing:** Footwear Size (7–11.5) and Clothing Size (XS–2XL).
  * **Price & Gender:** Tiered price ranges and gender classification (Men, Women, Unisex).
  * **Activity Type:** Running, Lifestyle, Basketball, Training, Walking, Tennis, Golf, Baseball, Skateboarding, Soccer, Lacrosse, Pickleball.
  * **Color Palette:** Visual color swatch filter.
  * **Sorting Options:** *Featured*, *Price: Low to High*, *Price: High to Low*, *Newest*, *Available*.
* **🛒 Shopping Cart & Checkout:**
  * Add, remove, and adjust item quantities with dynamic subtotal, tax, and total calculations.
  * Interactive checkout flow.
* **🔑 Authentication:**
  * User Login and Account Registration forms.
* **🛠 Admin Dashboard & Product Management:**
  * Administrative interface with a form to create and publish new products (**Add Product**).
* **🧪 Unit Testing:**
  * Comprehensive test suite using Vitest covering domain entities (`Order` and `Cart`).

---

## 📁 Project Structure

The project structure follows a clean, modular architecture:

```text
src/
├── assets/          # Product images, SVG icons, and static media
├── components/      # Reusable UI components (Buttons, Cards, Modals, Product Drawer)
├── context/         # Global state management (useCart context provider)
├── entities/        # Core domain model classes (Cart, Order)
├── factory/         # Factory Pattern implementation for Product sub-classes
├── pages/           # Application views (Home, Products, Cart, Checkout, Login, Register, Admin)
├── reducers/        # Reducers for handling complex state transitions
├── services/        # Data services and mock API interactions
├── styles/          # Global styles and CSS modules (App.css, index.css)
├── tests/           # Unit tests for domain models (Vitest)
└── utils/           # Helper functions and localStorage helpers
```

---

## 📸 Interface Screenshots & Screenshots Walkthrough

Below are previews of key pages and components across the application.

### 🏠 Main Page (Home)
The landing page introduces the store, showcasing top categories, featured collections, and quick links to shop.

![Main Page](screenshots/main_page/photo1.png)
![Main Page](screenshots/main_page/photo2.png)
![Main Page](screenshots/main_page/photo3.png)
![Main Page](screenshots/main_page/photo4.png)
![Main Page](screenshots/main_page/photo5.png)
---

### 🛍️ Products Page (Catalog)
Full catalog display featuring product cards, dynamic badges (e.g., *NEW*), price displays, and color variant swatches.

![Products Page](screenshots/product_page/photo1.png)
![Products Page](screenshots/product_page/photo2.png)

---

### 🎛️ Filtering and Sorting (Filter Panel)
Sidebar filters allowing users to narrow down products by category, footwear size, clothing size, accessory type, price range, activity, gender, and color, along with quick sorting options.


![Products and Sorting](screenshots/filters/photo1.png)
![Products and Sorting](screenshots/filters/photo2.png)
![Products and Sorting](screenshots/filters/photo3.png)
![Products and Sorting](screenshots/filters/photo4.png)

---

### ⚡ Product Drawer (Quick View)
Interactive slide-out drawer enabling users to view high-resolution product photos, select sizes/colors, and add products directly to the bag.

![Product Drawer](screenshots/product_drawer/photo1.png)
![Product Drawer](screenshots/product_drawer/photo2.png)
![Product Drawer](screenshots/product_drawer/photo3.png)

---

### 🛒 Cart Page (Shopping Bag)
Detailed shopping cart summary listing selected items, quantity controls, price itemization (subtotal, tax, shipping), and transition to checkout.

![Cart Page](screenshots/cart_page/photo1.png)
![Cart Page](screenshots/cart_page/photo2.png)
![Cart Page](screenshots/cart_page/photo3.png)

---

### 💳 Checkout Page
Secure order placement form capturing shipping details, payment preferences, and final order review.

![Checkout Page](screenshots/checkout_page/photo1.png)
![Checkout Page](screenshots/checkout_page/photo2.png)

---

### 🔑 Authentication (Login & Register)
User sign-in and registration pages for managing user accounts and saved preferences.

#### Login
![Login Page](screenshots/login_register_page/login.png)

#### Register
![Register Page](screenshots/login_register_page/register.png)

---

### ⚙️ Admin Dashboard & Add Product
Admin management panel featuring a rich form to create, configure, and publish new product listings to the catalog.

#### Admin Dashboard
![Admin Page](screenshots/admin_dashboard/photo1.png)

#### Add Product Form
![Add Product Form](screenshots/add_product_page/photo1.png)
![Add Product Form](screenshots/add_product_page/photo2.png)

---

## 🧪 Testing & Quality Assurance

Unit testing is implemented with **Vitest** to verify business logic and domain classes:

![Testing Results](screenshots/tests_run/photo.png)

### Test Coverage Highlights:
* **Order Domain Class:**
  * Order creation and validation
  * Unique ID generation and timestamps
  * Total price and tax computation
  * Item count calculation
  * Order status state transitions
* **Cart Domain Class:**
  * Adding and removing cart items
  * Quantity updates
  * Dynamic calculation of subtotal, tax, and overall total