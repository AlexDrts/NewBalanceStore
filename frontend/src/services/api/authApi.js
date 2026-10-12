import { apiRequest } from "./apiClient.js";

/**
 * Виконує запит автентифікації користувача на сервері.
 * @param {string} email - Адреса електронної пошти.
 * @param {string} password - Пароль користувача.
 * @returns {Promise<{ token: string, email: string, fullName: string, role: string }>} Результат автентифікації.
 */
export function login(email, password) {
    return apiRequest("/api/Auth/login", {
        method: "POST",
        body: JSON.stringify({
            email,
            password
        })
    });
}

/**
 * Виконує запит реєстрації нового облікового запису користувача.
 * @param {string} email - Адреса електронної пошти.
 * @param {string} password - Пароль облікового запису.
 * @param {string} fullName - Повне ім'я користувача.
 * @returns {Promise<{ token: string, email: string, fullName: string, role: string }>} Результат реєстрації з видачею токена.
 */
export function register(email, password, fullName) {
    return apiRequest("/api/Auth/register", {
        method: "POST",
        body: JSON.stringify({
            email,
            password,
            fullName
        })
    });
}