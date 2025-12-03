import { storage, db, auth } from '../firebase-config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import type { User } from 'firebase/auth';

export const uploadAndSetProfilePicture = async (file: File, user: User): Promise<string> => {
    if (!user) throw new Error("Пользователь не аутентифицирован.");


    const storageRef = ref(storage, `profile_pictures/${user.uid}`);


    const snapshot = await uploadBytes(storageRef, file);


    const downloadURL = await getDownloadURL(snapshot.ref);

    if (auth.currentUser) {
        await updateProfile(auth.currentUser, { photoURL: downloadURL });
    }


    const userDocRef = doc(db, 'users', user.uid);
    await updateDoc(userDocRef, {
        profilePictureUrl: downloadURL,
    });

    return downloadURL;
};