import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged as onFirebaseAuthStateChanged, // Переименовываем для ясности
    type User as FirebaseUser // Тип пользователя из Firebase
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import type { SignupForm, LoginForm } from "../shared/types/types"; // Предполагаем, что у вас есть такие типы

// Создаем нового пользователя в Auth и запись в Firestore
export const signUpUser = async ({ email, password }: SignupForm): Promise<FirebaseUser> => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = userCredential;

    // Создаем документ для пользователя в коллекции 'users' с его UID в качестве ID
    await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        profilePictureUrl: null, // Изначально аватар отсутствует
    });

    return user;
};

// Вход пользователя
export const loginUser = async ({ email, password }: LoginForm): Promise<FirebaseUser> => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
};

// Выход пользователя
export const logoutUser = (): Promise<void> => {
    return signOut(auth);
};

// Наблюдатель за состоянием аутентификации
// Он будет сообщать нашему приложению, вошел пользователь или вышел
export const onAuthStateChanged = (callback: (user: FirebaseUser | null) => void) => {
    return onFirebaseAuthStateChanged(auth, callback);
};