import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged as onFirebaseAuthStateChanged,
    type User as FirebaseUser
} from "firebase/auth";
import { auth } from "../firebase-config";
import type { SignupForm, LoginForm } from "../shared/types/types";
import { useFavoritesStore } from "../store/favorites-store";
// ==> Импортируем новую функцию для синхронизации пользователя
import { syncUserOnBackend } from "./userService";

export const signUpUser = async ({ email, password }: SignupForm): Promise<FirebaseUser> => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = userCredential;

    // ==> После регистрации в Firebase, создаем запись в НАШЕЙ базе данных
    try {
        await syncUserOnBackend();
    } catch (error) {
        console.error("Не удалось синхронизировать пользователя с бэкендом после регистрации:", error);
        // Здесь можно добавить логику отката регистрации, если нужно
    }

    return user;
};

export const loginUser = async ({ email, password }: LoginForm): Promise<FirebaseUser> => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    // ==> ЗАМЕНЯЕМ СТАРУЮ СИНХРОНИЗАЦИЮ НА НОВУЮ
    await useFavoritesStore.getState().syncWithServer();

    return userCredential.user;
};

export const logoutUser = (): Promise<void> => {
    useFavoritesStore.getState().clearFavorites();
    return signOut(auth);
};

export const onAuthStateChanged = (callback: (user: FirebaseUser | null) => void) => {
    return onFirebaseAuthStateChanged(auth, callback);
};