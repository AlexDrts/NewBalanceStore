# Специфікація REST API (API Reference)

> **Повний опис контрактів, ендпоінтів, запитів та відповідей New Balance Store API**  
> Базовий URL: `/api` | Формат даних: `application/json` | Автентифікація: `Bearer <JWT>`

---

## 1. Загальні відомості

Усі запити до API здійснюються через протокол HTTP/HTTPS із використанням стандартних методів:
- `GET` — отримання ресурсів (безпечні, ідемпотентні).
- `POST` — створення нових сутностей (неідемпотентні).
- `PUT` — повне оновлення існуючих сутностей (ідемпотентні).
- `PATCH` — часткова зміна властивостей (наприклад, статусу замовлення).
- `DELETE` — видалення ресурсів (ідемпотентні).

### Стандартні коди відповідей:
- `200 OK` — запит виконано успішно, дані повертаються у тілі відповіді.
- `201 Created` — ресурс успішно створено, заголовок `Location` містить посилання на новий об'єкт.
- `204 No Content` — запит успішний, тіло відповіді порожнє (оновлення або видалення).
- `400 Bad Request` — помилка валідації вхідних даних або некоректний формат запиту.
- `401 Unauthorized` — відсутній або недійсний токен авторизації.
- `403 Forbidden` — недостатньо прав (потрібна роль `Admin`).
- `404 Not Found` — запитуваний ресурс за вказаним ID не знайдено.

---

## 2. Автентифікація (`/api/Auth`)

### 2.1. Реєстрація користувача
- **Метод**: `POST /api/Auth/register`
- **Доступ**: Public
- **Тіло запиту**:
```json
{
  "email": "customer@example.com",
  "password": "StrongPassword123!",
  "fullName": "Тарас Шевченко"
}
```
- **Відповідь (`200 OK`)**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "email": "customer@example.com",
  "fullName": "Тарас Шевченко",
  "role": "Customer"
}
```

### 2.2. Вхід у систему
- **Метод**: `POST /api/Auth/login`
- **Доступ**: Public
- **Тіло запиту**:
```json
{
  "email": "admin@example.com",
  "password": "AdminPassword123!"
}
```
- **Відповідь (`200 OK`)**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "email": "admin@example.com",
  "fullName": "Admin User",
  "role": "Admin"
}
```

---

## 3. Товари (`/api/Products`)

### 3.1. Отримання списку товарів з фільтрацією
- **Метод**: `GET /api/Products`
- **Доступ**: Public
- **Query-параметри**:
  - `SearchTerm` (string) — пошуковий рядок за назвою/описом.
  - `Category` (string) — категорія ("Running", "Lifestyle").
  - `MinPrice` (decimal) — нижня межа ціни.
  - `MaxPrice` (decimal) — верхня межа ціни.
  - `SortBy` (string) — "price_asc", "price_desc", "name".

- **Відповідь (`200 OK`)**:
```json
[
  {
    "id": 1,
    "name": "New Balance 9060",
    "description": "Сучасні бігові кросівки з ретро-футуристичним дизайном.",
    "type": "Footwear",
    "category": "Lifestyle",
    "activity": "Casual",
    "gender": "Unisex",
    "price": 180.00,
    "oldPrice": null,
    "isNew": true,
    "colors": ["Castlerock", "Sea Salt"],
    "images": {
      "Castlerock": ["https://res.cloudinary.com/.../img1.webp"]
    },
    "variants": [
      {
        "color": "Castlerock",
        "size": "9.5",
        "quantity": 12
      }
    ]
  }
]
```

### 3.2. Отримання товару за ID
- **Метод**: `GET /api/Products/{id}`
- **Доступ**: Public
- **Відповідь (`200 OK`)**: детальний об'єкт `ProductDto`.
- **Відповідь (`404 Not Found`)**: `{"message": "Товар с ID '999' не найден."}`.

### 3.3. Створення товару
- **Метод**: `POST /api/Products`
- **Доступ**: `[Authorize(Roles = "Admin")]`
- **Заголовок**: `Authorization: Bearer <jwt_admin_token>`
- **Тіло запиту**: `CreateProductDto`.
- **Відповідь (`201 Created`)**: створений об'єкт із присвоєним ID.

### 3.4. Оновлення товару
- **Метод**: `PUT /api/Products/{id}`
- **Доступ**: `[Authorize(Roles = "Admin")]`
- **Тіло запиту**: `CreateProductDto`.
- **Відповідь (`204 No Content`)**.

### 3.5. Видалення товару
- **Метод**: `DELETE /api/Products/{id}`
- **Доступ**: `[Authorize(Roles = "Admin")]`
- **Відповідь (`204 No Content`)**.
- **Відповідь (`404 Not Found`)**: товар із таким ID не знайдено.

### 3.6. Завантаження фотографії товару
- **Метод**: `POST /api/Products/upload-image`
- **Доступ**: `[Authorize(Roles = "Admin")]`
- **Формат**: `multipart/form-data` (поле `file`)
- **Відповідь (`200 OK`)**:
```json
{
  "url": "https://res.cloudinary.com/cloudname/image/upload/v12345/sample.webp"
}
```

---

## 4. Замовлення (`/api/Orders`)

### 4.1. Створення нового замовлення
- **Метод**: `POST /api/Orders`
- **Доступ**: Public / Customer
- **Тіло запиту**:
```json
{
  "customerName": "Олена Коваль",
  "customerEmail": "olena@example.com",
  "customerPhone": "+380501234567",
  "shippingAddress": "м. Київ, вул. Хрещатик 1, кв. 10",
  "items": [
    {
      "productId": 1,
      "color": "Castlerock",
      "size": "9.5",
      "quantity": 1
    }
  ]
}
```
- **Відповідь (`201 Created`)**:
```json
{
  "id": 1420581,
  "customerName": "Олена Коваль",
  "customerEmail": "olena@example.com",
  "customerPhone": "+380501234567",
  "shippingAddress": "м. Київ, вул. Хрещатик 1, кв. 10",
  "totalAmount": 180.00,
  "status": "Pending",
  "createdAt": "2026-10-12T19:40:00Z",
  "items": [
    {
      "productId": 1,
      "productName": "New Balance 9060",
      "color": "Castlerock",
      "size": "9.5",
      "quantity": 1,
      "price": 180.00
    }
  ]
}
```

### 4.2. Отримання замовлення за ID
- **Метод**: `GET /api/Orders/{id}`
- **Доступ**: Public (у поточному контролері авторизація не вимагається).
- **Відповідь (`200 OK`)**: об'єкт `OrderDto`.

### 4.3. Оновлення статусу замовлення
- **Метод**: `PATCH /api/Orders/{id}/status`
- **Доступ**: Public (у поточному контролері авторизація не вимагається).
- **Тіло запиту** (string у JSON):
```json
"Shipped"
```
- **Відповідь (`204 No Content`)**.
