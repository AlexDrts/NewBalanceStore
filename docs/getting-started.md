# Посібник із початку роботи (Getting Started)

> **Інструкція з налаштування, запуску, тестування та розгортання проєкту New Balance Store**

---

## 1. Системні вимоги (Prerequisites)

Перед початком переконайтеся, що на вашій робочій станції встановлено наступне програмне забезпечення:

| Компонент | Мінімальна версія | Призначення |
| :--- | :--- | :--- |
| **.NET SDK** | `10.0` (або новіший) | Компіляція та запуск C# бекенду |
| **Node.js** | `18.x` / `20.x` LTS | Середовище виконання для збірки фронтенду |
| **npm** | `9.x`+ | Пакетний менеджер Node |
| **Git** | `2.30`+ | Система контролю версій |
| **Docker** *(опціонально)* | `24.x`+ | Запуск бекенду в ізольованому контейнері |

---

## 2. Клонування репозиторію

Склонуйте проєкт із віддаленого GitHub-репозиторію:

```bash
git clone https://github.com/AlexElNX/NewBalanceStore.git
cd NewBalanceStore
```

---

## 3. Конфігурація параметрів оточення

### 3.1. Налаштування Backend

Основна конфігурація сервера зберігається у файлі `NewBalanceStore.WebApi/appsettings.json`. Для локальної розробки рекомендується використовувати .NET User Secrets або змінні оточення:

```bash
cd NewBalanceStore.WebApi
dotnet user-secrets init
dotnet user-secrets set "Firebase:DatabaseUrl" "https://<your-project>.firebasedatabase.app/"
dotnet user-secrets set "Jwt:Secret" "YourStrongSecretKeyWithAtLeast32CharsLength!"
dotnet user-secrets set "CloudinarySettings:CloudName" "<your-cloud-name>"
dotnet user-secrets set "CloudinarySettings:ApiKey" "<your-api-key>"
dotnet user-secrets set "CloudinarySettings:ApiSecret" "<your-api-secret>"
cd ..
```

Структура `appsettings.json`:
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "Firebase": {
    "DatabaseUrl": "https://newbalancestore-bc142-default-rtdb.europe-west1.firebasedatabase.app/",
    "ProjectId": "newbalancestore-bc142"
  },
  "Jwt": {
    "Secret": "SuperSecretKeyForNewBalanceStoreApi2026SecureKey!",
    "Issuer": "NewBalanceStoreBackend",
    "Audience": "NewBalanceStoreFrontend",
    "ExpiryInMinutes": 60
  },
  "CloudinarySettings": {
    "CloudName": "your-cloud-name",
    "ApiKey": "your-api-key",
    "ApiSecret": "your-api-secret"
  }
}
```

### 3.2. Налаштування Frontend

У каталозі `frontend/` створіть файл `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 4. Запуск у середовищі розробки (Local Development)

### 4.1. Запуск Backend API

```bash
# Відновлення NuGet-залежностей
dotnet restore

# Запуск Web API проекту
dotnet run --project NewBalanceStore.WebApi
```

- **API Endpoint**: `http://localhost:5000` (або `https://localhost:5001`)
- **Інтерактивна документація Swagger**: `http://localhost:5000/swagger`

### 4.2. Запуск Frontend (React SPA)

У новому терміналі перейдіть до директорії `frontend/`:

```bash
cd frontend

# Встановлення npm-пакетів
npm install

# Запуск сервера розробки Vite із гарячим перезавантаженням (HMR)
npm run dev
```

- **Клієнтський застосунок**: `http://localhost:5173`

---

## 5. Запуск за допомогою Docker

Проєкт містить багатоетапний Dockerfile для компіляції та запуску легковагового образу ASP.NET:

```bash
# 1. Збірка Docker-образу
docker build -t newbalancestore-api .

# 2. Запуск контейнера з прокиданням порту 8080
docker run -d -p 8080:8080 --name newbalance-api newbalancestore-api

# 3. Перевірка статусу
docker ps
```

Доступ до API через Docker: `http://localhost:8080/swagger`.

---

## 6. Запуск автоматизованих тестів

### 6.1. Backend Тести (.NET / NUnit)

Розв'язок містить набір юніт-тестів та інтеграційних тестів із перевіркою реальних ендпоінтів:

```bash
# Запуск усіх тестів розв'язку
dotnet test

# Запуск тільки модульних тестів із детальним логуванням
dotnet test NewBalanceStore.UnitTests --logger "console;verbosity=detailed"

# Запуск інтеграційних тестів
dotnet test NewBalanceStore.IntegrationTests
```

### 6.2. Frontend Тести (Vitest)

```bash
cd frontend

# Запуск швидких юніт-тестів компонентів та сутностей
npm run test:run

# Запуск у режимі спостереження (watch mode)
npm run test
```

---

## 7. Генерація сайту технічної документації (DocFX)

У репозиторії налаштовано конфігурацію `docfx.json`, яка збирає як загальні Markdown-сторінки з папки `docs/`, так і автоматично парсить XML-коментарі C# коду з усіх `.csproj` проєктів:

```bash
# Збірка сайту документації
docfx docfx.json

# Локальний попередній перегляд документації
docfx docfx.json --serve
```

Сайт документації доступний за адресою `http://localhost:8080` (або вказаному порту DocFX).

---

## 8. Типові проблеми (Troubleshooting)

| Проблема | Причина | Вирішення |
| :--- | :--- | :--- |
| **CORS помилка при виклику API з браузера** | Фронтенд запущено на іншому домені/порті | Перевірте налаштування `app.UseCors("AllowReactApp")` у `Program.cs`. |
| **HTTP 401 при виклику адміністративних дій** | Відсутній або прострочений Bearer JWT токен | Увійдіть під обліковим записом адміністратора та додайте токен у заголовок `Authorization: Bearer <token>`. |
| **Помилка завантаження фотографій** | Не заповнено `CloudinarySettings` | Перевірте наявність валідних ключів `CloudName`, `ApiKey`, `ApiSecret` у конфігурації. |
| **Помилка 404 при отриманні Firebase вузла** | Некоректний URL бази даних | Переконайтеся, що `Firebase:DatabaseUrl` закінчується на `.firebasedatabase.app/`. |
# Getting Started