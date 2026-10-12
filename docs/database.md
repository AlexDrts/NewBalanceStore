# Архітектура бази даних (Database Specification)

> **Специфікація структури та збереження даних New Balance Store**  
> СУБД: Google Firebase Realtime Database (NoSQL JSON Tree)

---

## 1. Загальна концепція NoSQL сховища

Firebase Realtime Database зберігає дані як єдине велике деревоподібне ієрархічне JSON-дерево. На відміну від реляційних СУБД (PostgreSQL/SQL Server), зв'язки між сутностями підтримуються через ключі та денормалізацію окремих властивостей (наприклад, знімок назви та вартості товару в середині замовлення).

Кореневі вузли системи:
```text
https://<project-id>.firebasedatabase.app/
│
├── products/       # Каталог товарів та варіацій
├── orders/         # Оформлені замовлення клієнтів
└── users/          # Облікові записи та профілі користувачів
```

---

## 2. Структура колекцій (Вузлів JSON)

### 2.1. Вузол `products/{productId}`

Зберігає інформацію про кожну окрему модель виробу. Ключем є числовий ідентифікатор товару.

```json
{
  "id": 1,
  "name": "New Balance 9060",
  "description": "Сучасні кросівки з футуристичним стилем та підошвою ABZORB.",
  "type": "Footwear",
  "category": "Lifestyle",
  "activity": "Casual",
  "gender": "Unisex",
  "price": 180.00,
  "oldPrice": null,
  "isNew": true,
  "colors": [
    "Castlerock",
    "Sea Salt"
  ],
  "images": {
    "Castlerock": [
      "https://res.cloudinary.com/.../castlerock_1.webp",
      "https://res.cloudinary.com/.../castlerock_2.webp"
    ],
    "Sea Salt": [
      "https://res.cloudinary.com/.../seasalt_1.webp"
    ]
  },
  "variants": [
    {
      "color": "Castlerock",
      "size": "9",
      "quantity": 10
    },
    {
      "color": "Castlerock",
      "size": "9.5",
      "quantity": 5
    },
    {
      "color": "Castlerock",
      "size": "10",
      "quantity": 0
    }
  ]
}
```

### 2.2. Вузол `orders/{orderId}`

Фіксує факт покупки. Ключем є унікальний числовий ідентифікатор замовлення.

```json
{
  "id": 894120,
  "customerName": "Олександр Шевченко",
  "customerEmail": "alex@example.com",
  "customerPhone": "+380501112233",
  "shippingAddress": "м. Львів, вул. Городоцька 15, кв. 4",
  "totalAmount": 180.00,
  "status": "Pending",
  "createdAt": "2026-10-12T17:45:00.000Z",
  "items": [
    {
      "productId": "1",
      "productName": "New Balance 9060",
      "color": "Castlerock",
      "size": "9.5",
      "quantity": 1,
      "price": 180.00
    }
  ]
}
```

### 2.3. Вузол `users/{userId}`

Зберігає облікові дані зареєстрованих користувачів. Ключем є строковий GUID користувача.

```json
{
  "id": "e4f8a120-410a-4a25-9f5b-b99818e38d72",
  "email": "user@example.com",
  "passwordHash": "AQAAAAIAAYagAAAAEI9p9y...",
  "firstName": "Олександр",
  "lastName": "Шевченко",
  "phone": "+380501112233",
  "role": "Customer"
}
```

---

## 3. Цілісність даних та транзакційні контракти

1. **Ізоляція цін**: ціна товару у вузлі `orders` не посилається динамічно на вузол `products`, а копіюється з перевіркою на момент оформлення. Це гарантує, що наступні зміни цін адміністратором не спотворюють фінансову історію раніше створених замовлень.
2. **Генерація ідентифікаторів**: числові ID товарів і замовлень формуються на основі `(int)(DateTime.UtcNow.Ticks % int.MaxValue)`. Такий спосіб не гарантує унікальності чи монотонності; при збігу ID запис у Firebase може перезаписати наявний вузол.
3. **Безпека паролів**: поле `passwordHash` ніколи не повертається у публічних DTO відповідях API і зберігає тільки незворотній хеш PBKDF2.
