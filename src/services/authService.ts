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

export const signUpUser = async ({ email, password }: SignupForm): Promise<FirebaseUser> => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
};

export const loginUser = async ({ email, password }: LoginForm): Promise<FirebaseUser> => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

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