import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAy_Yj-UskZB-3PrpMIK2CLs19XWyZzKUQ",
    authDomain: "endterm-8c4a5.firebaseapp.com",
    projectId: "endterm-8c4a5",
    storageBucket: "endterm-8c4a5.firebasestorage.app",
    messagingSenderId: "723047213492",
    appId: "1:723047213492:web:445b7b2643ee1048886ae1",
    measurementId: "G-4V5MBMVTCK"
};



const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);