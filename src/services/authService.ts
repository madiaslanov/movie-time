import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged as onFirebaseAuthStateChanged,
    type User as FirebaseUser
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import type { SignupForm, LoginForm } from "../shared/types/types";


export const signUpUser = async ({ email, password }: SignupForm): Promise<FirebaseUser> => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = userCredential;


    await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        profilePictureUrl: null,
    });

    return user;
};


export const loginUser = async ({ email, password }: LoginForm): Promise<FirebaseUser> => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
};

export const logoutUser = (): Promise<void> => {
    return signOut(auth);
};



export const onAuthStateChanged = (callback: (user: FirebaseUser | null) => void) => {
    return onFirebaseAuthStateChanged(auth, callback);
};