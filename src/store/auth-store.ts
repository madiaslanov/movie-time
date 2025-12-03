import {create} from 'zustand';
import type {User as FirebaseUser} from 'firebase/auth'; // Импортируем тип

interface AuthState {
    isAuthenticated: boolean;
    user: FirebaseUser | null;
    isLoading: boolean;
    setUser: (user: FirebaseUser | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    isLoading: true,
    setUser: (user) => set({
        user,
        isAuthenticated: !!user,
        isLoading: false,
    }),
}));