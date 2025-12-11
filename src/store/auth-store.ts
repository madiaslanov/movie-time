import { create } from 'zustand';
import type { User as FirebaseUser } from 'firebase/auth';

interface AuthState {
    isAuthenticated: boolean;
    user: FirebaseUser | null;
    isLoading: boolean;
    profilePictureVersion: number;
    setUser: (user: FirebaseUser | null) => void;
    setIsLoading: (loading: boolean) => void;
    refreshProfilePicture: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    isLoading: true,
    profilePictureVersion: 0,
    setUser: (user) => set({
        user,
        isAuthenticated: !!user,
    }),
    setIsLoading: (loading) => set({ isLoading: loading }),
    refreshProfilePicture: () => set((state) => ({
        profilePictureVersion: state.profilePictureVersion + 1
    })),
}));