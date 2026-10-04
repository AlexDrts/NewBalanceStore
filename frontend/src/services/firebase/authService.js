import {
    signOut,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail
} from "firebase/auth";

import { auth } from "./firebase.js";



// реєстрація через email та пароль
export async function registerWithEmail(email, password) {
    try {
        const result = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        await sendEmailVerification(result.user);

        console.log(
            "Користувача зареєстровано через email:",
            result.user
        );

        return result.user;
    } catch (error) {
        console.error(
            "Помилка реєстрації через email:",
            error
        );

        throw error;
    }
}

// логін через email та пароль
export async function loginWithEmail(email, password) {
    try {
        const result = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        console.log(
            "Успішний вхід через email:",
            result.user
        );

        return result.user;
    } catch (error) {
        console.error(
            "Помилка входу через email:",
            error
        );

        throw error;
    }
}

// відновлення пароля
export async function resetPassword(email) {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error) {
        console.error(
            "Помилка відновлення пароля:",
            error
        );

        throw error;
    }
}

// вихід
export async function logout() {
    await signOut(auth);
}

// отримати Firebase ID Token для бекенду
export async function getIdToken(forceRefresh = false) {
    const user = auth.currentUser;

    if (!user) {
        return null;
    }

    return await user.getIdToken(forceRefresh);
}

// підписка на зміну користувача
export function onUserChanged(callback) {
    return onAuthStateChanged(auth, callback);
}