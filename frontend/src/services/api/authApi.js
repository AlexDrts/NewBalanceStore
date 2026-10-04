import { apiRequest } from "./apiClient.js";

export function login(email, password) {
    return apiRequest("/api/Auth/login", {
        method: "POST",
        body: JSON.stringify({
            email,
            password
        })
    });
}

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