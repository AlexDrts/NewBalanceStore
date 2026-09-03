# New Balance Store - Архітектура проєкту

> Full-stack e-commerce платформа на базі React + ASP.NET Core Web API + Firebase Firestore  
> Backend: Clean / Onion Architecture  
> Frontend: React SPA + OOP + Factory Pattern

---

## 1. Загальна структура проєкту
```text
new-balance-store/
│
├── frontend/                         # React SPA
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── ...
│
├── backend/                          # ASP.NET Core Web API
│   ├── NewBalanceStore.sln
│   │
│   ├── src/
│   │   ├── NewBalanceStore.Domain/
│   │   ├── NewBalanceStore.Application/
│   │   ├── NewBalanceStore.Infrastructure/
│   │   └── NewBalanceStore.WebApi/
│   │
│   └── tests/
│       └── NewBalanceStore.UnitTests/
│
├── docs/
│   ├── SRS.md
│   └── ARCHITECTURE.md
│
├── .gitignore
└── README.md
```


---
## 2. Backend - Clean / Onion Architecture
```text
backend/
│
├── NewBalanceStore.sln
│
├── src/
│   │
│   ├── NewBalanceStore.Domain/
│   │   │
│   │   ├── Entities/
│   │   │   ├── Product.cs
│   │   │   ├── ProductVariant.cs
│   │   │   ├── Cart.cs
│   │   │   ├── CartItem.cs
│   │   │   ├── Order.cs
│   │   │   ├── OrderItem.cs
│   │   │   └── User.cs
│   │   │
│   │   ├── Enums/
│   │   │   ├── ProductType.cs
│   │   │   ├── Gender.cs
│   │   │   ├── OrderStatus.cs
│   │   │   └── UserRole.cs
│   │   │
│   │   ├── Interfaces/
│   │   │   ├── IProductRepository.cs
│   │   │   ├── ICartRepository.cs
│   │   │   ├── IOrderRepository.cs
│   │   │   └── IUserRepository.cs
│   │   │
│   │   └── Specifications/
│   │
│   │
│   ├── NewBalanceStore.Application/
│   │   │
│   │   ├── DTOs/
│   │   │   ├── Products/
│   │   │   │   ├── ProductDto.cs
│   │   │   │   ├── CreateProductDto.cs
│   │   │   │   └── UpdateProductDto.cs
│   │   │   │
│   │   │   ├── Cart/
│   │   │   │   ├── CartDto.cs
│   │   │   │   └── AddToCartDto.cs
│   │   │   │
│   │   │   ├── Orders/
│   │   │   │   ├── OrderDto.cs
│   │   │   │   └── CreateOrderDto.cs
│   │   │   │
│   │   │   └── Auth/
│   │   │       ├── RegisterDto.cs
│   │   │       └── LoginDto.cs
│   │   │
│   │   ├── Services/
│   │   │   ├── ProductService.cs
│   │   │   ├── CartService.cs
│   │   │   ├── OrderService.cs
│   │   │   └── AuthService.cs
│   │   │
│   │   ├── Interfaces/
│   │   │   ├── IProductService.cs
│   │   │   ├── ICartService.cs
│   │   │   ├── IOrderService.cs
│   │   │   └── IAuthService.cs
│   │   │
│   │   ├── Validators/
│   │   │   ├── CreateProductValidator.cs
│   │   │   ├── UpdateProductValidator.cs
│   │   │   ├── RegisterValidator.cs
│   │   │   └── CreateOrderValidator.cs
│   │   │
│   │   └── Mappings/
│   │
│   │
│   ├── NewBalanceStore.Infrastructure/
│   │   │
│   │   ├── Firebase/
│   │   │   ├── FirestoreContext.cs
│   │   │   └── FirebaseConfiguration.cs
│   │   │
│   │   ├── Repositories/
│   │   │   ├── ProductRepository.cs
│   │   │   ├── CartRepository.cs
│   │   │   ├── OrderRepository.cs
│   │   │   └── UserRepository.cs
│   │   │
│   │   └── Authentication/
│   │       └── FirebaseAuthService.cs
│   │
│   │
│   └── NewBalanceStore.WebApi/
│       │
│       ├── Controllers/
│       │   ├── AuthController.cs
│       │   ├── ProductsController.cs
│       │   ├── CartController.cs
│       │   ├── OrdersController.cs
│       │   └── UsersController.cs
│       │
│       ├── Middleware/
│       │
│       ├── Extensions/
│       │
│       ├── Program.cs
│       └── appsettings.json
│
│
└── tests/
    │
    └── NewBalanceStore.UnitTests/
        ├── Services/
        │   ├── ProductServiceTests.cs
        │   ├── CartServiceTests.cs
        │   └── OrderServiceTests.cs
        │
        └── Controllers/
```

---
## 3. Backend — відповідальність шарів
```text
                    ┌─────────────────────────────┐
                    │       WebApi / API          │
                    │                             │
                    │ Controllers / Middleware    │
                    └──────────────┬──────────────┘
                                   │
                                   ▼
                    ┌─────────────────────────────┐
                    │       Application           │
                    │                             │
                    │ Services / DTOs /           │
                    │ Validators / Interfaces     │
                    └──────────────┬──────────────┘
                                   │
                                   ▼
                    ┌─────────────────────────────┐
                    │          Domain             │
                    │                             │
                    │ Entities / Enums /          │
                    │ Interfaces / Business rules │
                    └─────────────────────────────┘
                                   ▲
                                   │
                    ┌──────────────┴──────────────┐
                    │       Infrastructure        │
                    │                             │
                    │ Firebase / Firestore /      │
                    │ Repositories / Auth         │
                    └─────────────────────────────┘
```
### Domain

Містить основні бізнес-сутності та правила системи.

Domain не залежить від Firebase, ASP.NET Core або інших зовнішніх технологій.

### Application

Містить прикладну бізнес-логіку:

* Services
* DTOs
* Validators
* Application Interfaces
* Mappings

### Infrastructure

Відповідає за роботу із зовнішніми системами:

* Firebase
* Cloud Firestore
* Firebase Authentication
* Реалізацію Repository interfaces

### WebApi

Є точкою входу для клієнтського застосунку:

* REST Controllers
* Authentication / Authorization
* Middleware
* Dependency Injection
* Swagger / OpenAPI

---



## 4. Frontend — React
```text
frontend/
│
├── public/
│
├── src/
│   │
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── ...
│   │
│   ├── components/
│   │   ├── AddedToBagPopup/
│   │   ├── Cart/
│   │   ├── ConfirmModal/
│   │   ├── Footer/
│   │   ├── MainHeader/
│   │   ├── TopHeader/
│   │   ├── ProductCard/
│   │   ├── ProductDrawer/
│   │   ├── ProductFilters/
│   │   └── Auth/
│   │
│   ├── context/
│   │   ├── CartContext.jsx
│   │   └── AuthContext.jsx
│   │
│   ├── entities/
│   │   │
│   │   ├── Product/
│   │   │   ├── Product.js
│   │   │   ├── Shoe.jsx
│   │   │   ├── Clothing.jsx
│   │   │   └── Accessory.jsx
│   │   │
│   │   ├── Cart/
│   │   │   ├── Cart.js
│   │   │   └── CartItem.js
│   │   │
│   │   └── Order/
│   │       ├── Order.js
│   │       └── OrderItem.js
│   │
│   ├── factory/
│   │   └── productFactory.js
│   │
│   ├── pages/
│   │   ├── Admin/
│   │   ├── Cart/
│   │   ├── Checkout/
│   │   ├── Home/
│   │   ├── Login/
│   │   ├── Product/
│   │   ├── Products/
│   │   └── Profile/
│   │
│   ├── reducers/
│   │   └── cartReducer.js
│   │
│   ├── services/
│   │   ├── api/
│   │   │   ├── productService.js
│   │   │   ├── cartService.js
│   │   │   ├── orderService.js
│   │   │   └── authService.js
│   │   │
│   │   └── firebase/
│   │
│   ├── styles/
│   │   ├── App.css
│   │   └── index.css
│   │
│   ├── tests/
│   │   ├── Product.test.js
│   │   ├── Cart.test.js
│   │   └── ...
│   │
│   ├── utils/
│   │   ├── localStorage.js
│   │   └── ...
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
└── vite.config.js
```
---

## 5. Frontend — Factory Pattern
На Frontend використовується Factory Pattern для створення конкретного типу товару.
```text
                         Product
                            ▲
             ┌──────────────┼──────────────┐
             │              │              │
           Shoe          Clothing       Accessory
             ▲              ▲              ▲
             │              │              │
             └──────────────┼──────────────┘
                            │
                    productFactory
                            │
                            ▼
                     createProduct()
```

Фабрика отримує дані товару та створює відповідний об'єкт:


```text
data.type
    │
    ├── "Footwear"  → new Shoe(data)
    │
    ├── "Clothing"  → new Clothing(data)
    │
    ├── "Accessory" → new Accessory(data)
    │
    └── other       → new Product(data)
```
Таким чином, код клієнтської частини не повинен безпосередньо визначати, який клас необхідно створити.

---


## 6. Product — структура сутності
Один Product представляє конкретну модель товару.

Варіації товару за кольором, розміром та кількістю зберігаються окремо.


```text
Product
│
├── id
├── name
├── description
├── type
├── category
├── gender
├── price
├── oldPrice
├── images
├── colors
├── isNew
├── inStock
│
└── variants[]
      │
      ├── color
      ├── size
      └── quantity
```

Приклад:

```text
Product: New Balance 9060

Variants:

White / 8     / 0
White / 9     / 12
White / 10    / 10
White / 10.5  / 3
Black / 9     / 7
Black / 10    / 15
```

Це дозволяє зберігати один товар із великою кількістю комбінацій розміру та кольору.

---


## 7. Firebase / Cloud Firestore
```text
Firestore
│
├── users/
│   └── {userId}
│
├── products/
│   └── {productId}
│
├── carts/
│   └── {cartId}
│
└── orders/
    └── {orderId}
```

---

## 7.1. users
```text
users/{userId}

{
    email: string,
    firstName: string,
    lastName: string,
    phone: string,
    role: "Customer" | "Admin"
}
```

Автентифікація користувачів виконується через Firebase Authentication.

---


## 7.2. products
```text
products/{productId}

{
    name: string,
    description: string,

    type: "Footwear" | "Clothing" | "Accessories",

    category: string,
    gender: "Men" | "Women" | "Unisex",

    price: number,
    oldPrice: number | null,

    images: {},

    isNew: boolean,

    variants: [
        {
            color: string,
            size: string,
            quantity: number
        }
    ]
}
```

---


## 7.3. carts
```text
carts/{cartId}

{
    userId: string,

    items: [
        {
            productId: string,
            color: string,
            size: string,
            quantity: number
        }
    ],

    updatedAt: timestamp
}
```

---


## 7.4. orders
```text
orders/{orderId}

{
    userId: string,

    items: [
        {
            productId: string,
            productName: string,
            color: string,
            size: string,
            quantity: number,
            price: number
        }
    ],

    customer: {
        firstName: string,
        lastName: string,
        email: string,
        phone: string
    },

    shippingAddress: {
        city: string,
        street: string,
        postalCode: string
    },

    totalPrice: number,

    status: "Pending",

    createdAt: timestamp
}
```

---



## 8. Основні зв'язки
```text
User
 │
 ├──────────────► Cart
 │                  │
 │                  └────► CartItem
 │                            │
 │                            └────► Product
 │
 └──────────────► Order
                    │
                    └────► OrderItem
                              │
                              └────► Product


Product
 │
 └────► ProductVariant
          │
          ├── color
          ├── size
          └── quantity
```

---


## 9. REST API
Frontend взаємодіє з Backend виключно через REST API.

```text
React Frontend
      │
      │ HTTP / HTTPS
      ▼
ASP.NET Core Web API
      │
      ▼
Application Services
      │
      ▼
Repositories
      │
      ▼
Firebase Firestore
```

Основні endpoints:


```text
/api/auth
    POST /register
    POST /login

/api/products
    GET    /
    GET    /{id}
    POST   /
    PUT    /{id}
    DELETE /{id}

/api/cart
    GET    /
    POST   /items
    PUT    /items/{id}
    DELETE /items/{id}

/api/orders
    POST /
    GET  /
    GET  /{id}

/api/users
    GET /profile
    PUT /profile
```


---



## 10. Авторизація
```text
React
 │
 │ Firebase Authentication
 ▼
Firebase Auth
 │
 │ JWT / ID Token
 ▼
React
 │
 │ Authorization: Bearer <token>
 ▼
ASP.NET Core Web API
 │
 ├── Token validation
 │
 ├── Role validation
 │
 └── Controller
```

Ролі:

```text
Guest
  │
  └── перегляд каталогу

Customer
  │
  ├── каталог
  ├── кошик
  ├── checkout
  ├── профіль
  └── історія замовлень

Admin
  │
  └── CRUD товарів
```

---


## 11. Dependency Flow
Clean Architecture передбачає залежності у напрямку до Domain:

```text
                    ┌──────────────┐
                    │    WebApi    │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │ Application  │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │    Domain    │
                    └──────────────┘
                           ▲
                           │
                    ┌──────┴───────┐
                    │Infrastructure│
                    └──────────────┘
```


Domain не залежить від:

ASP.NET Core
Firebase
Firestore
React
HTTP
конкретної БД


---


## 12. Технологічний стек

| Частина         | Технології                 |
| --------------- | -------------------------- |
| Frontend        | React, Vite, JavaScript    |
| Routing         | React Router               |
| Styling         | CSS / CSS Modules          |
| State           | Context API + Reducers     |
| OOP             | JavaScript Classes         |
| Design Pattern  | Factory Pattern            |
| Backend         | ASP.NET Core Web API       |
| Architecture    | Clean / Onion Architecture |
| Language        | C#                         |
| Database        | Firebase Cloud Firestore   |
| Authentication  | Firebase Authentication    |
| API             | REST                       |
| Documentation   | Swagger / OpenAPI          |
| Testing         | NUnit + Vitest             |
| Version Control | Git / GitHub               |
| CI/CD           | GitHub Actions             |


---



## 13. Архітектурні патерни
У проєкті використовуються:

**Backend**

**Clean / Onion Architecture**

Відповідає за розділення:

```text
Domain
Application
Infrastructure
WebApi
```


**Frontend**

**Factory Pattern**

Використовується для створення конкретних типів Product:

```text
Product
 ├── Shoe
 ├── Clothing
 └── Accessory
```

через:

```text
productFactory.createProduct()
```


**Frontend State Management**

**Reducer Pattern**

Використовується для централізованого управління станом кошика:

```text
CartContext
      │
      ▼
cartReducer
      │
      ├── ADD_ITEM
      ├── REMOVE_ITEM
      ├── UPDATE_QUANTITY
      └── CLEAR_CART
```

---


## 14. Загальна архітектура системи
```text
┌───────────────────────────────────────────────┐
│                 USER / BROWSER                │
└───────────────────────┬───────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────┐
│              REACT FRONTEND                   │
│                                               │
│ Pages / Components / Context / Reducers       │
│ Entities / Factory / Services                 │
└───────────────────────┬───────────────────────┘
                        │
                     REST API
                        │
                        ▼
┌───────────────────────────────────────────────┐
│          ASP.NET CORE WEB API                 │
│                                               │
│ Controllers / Middleware / Authorization      │
└───────────────────────┬───────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────┐
│               APPLICATION                    │
│                                               │
│ Services / DTOs / Validators                  │
└───────────────────────┬───────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────┐
│                  DOMAIN                      │
│                                               │
│ Entities / Enums / Business Rules             │
└───────────────────────▲───────────────────────┘
                        │
                        │
┌───────────────────────┴───────────────────────┐
│              INFRASTRUCTURE                  │
│                                               │
│ Firebase / Firestore / Repositories / Auth    │
└───────────────────────┬───────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────┐
│            FIREBASE FIRESTORE                 │
│                                               │
│ users / products / carts / orders             │
└───────────────────────────────────────────────┘
```

---


## Статус: Architecture Draft — розробка триває.


