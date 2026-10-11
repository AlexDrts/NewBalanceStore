const TOKEN_KEY = "authToken";
const USER_KEY = "authUser";

export function saveAuth(authData) {
    localStorage.setItem(TOKEN_KEY, authData.token);

    localStorage.setItem(
        USER_KEY,
        JSON.stringify({
            email: authData.email,
            fullName: authData.fullName,
            role: authData.role
        })
    );
}

export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function getCurrentUser() {
    const user = localStorage.getItem(USER_KEY);

    return user ? JSON.parse(user) : null;
}

export function logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
}