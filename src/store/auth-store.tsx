import {create} from 'zustand';

interface User {
    email: string;
    uid: string;
    profilePicture?: string;
}

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
    setProfilePicture: (url: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    login: (user) => set({ isAuthenticated: true, user }),
    logout: () => set({ isAuthenticated: false, user: null }),
    setProfilePicture: (url) => set((state) => ({
        ...state,
        user: state.user ? { ...state.user, profilePicture: url } : null,
    })),
}));