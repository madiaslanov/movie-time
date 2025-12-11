import apiClient from "./apiClient.ts";
import type { User } from 'firebase/auth';

export const uploadAndSetProfilePicture = async (file: File, user: User): Promise<void> => {
    if (!user) throw new Error("Пользователь не аутентифицирован.");

    const formData = new FormData();
    formData.append('profilePicture', file);

    await apiClient.put('/users/profile-picture', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const syncUserOnBackend = async (): Promise<void> => {
    try {
        await apiClient.post('/users/sync');
    } catch (error) {
        console.error("Failed to sync user with backend", error);
        throw error;
    }
};