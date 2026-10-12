import { getToken } from "./authService.js";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Універсальний HTTP-клієнт для надсилання запитів до REST API бекенду.
 * Автоматично додає заголовок авторизації `Bearer <token>` при наявності збереженого JWT токена
 * та обробляє типові статус-коди відповідей.
 *
 * @param {string} endpoint - Відносний шлях ендпоінта (наприклад, "/products", "/orders").
 * @param {RequestInit} [options={}] - Стандартні опції fetch (method, body, headers).
 * @returns {Promise<any>} Десеріалізована JSON-відповідь від API.
 * @throws {Error} Викидає помилку із зазначенням статусу відповіді при неуспішному HTTP-коді.
 */
export async function apiRequest(endpoint, options = {}) {
    const token = getToken();

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",

            ...(token
                ? { Authorization: `Bearer ${token}` }
                : {}),

            ...(options.headers || {})
        }
    });

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    return response.json();
}
}