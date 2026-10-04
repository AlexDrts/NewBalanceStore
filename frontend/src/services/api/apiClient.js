import { getToken } from "./authService.js";

const API_URL = import.meta.env.VITE_API_URL;

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