import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
    favoriteMovieIds: number[];
    addFavorite: (id: number) => void;
    removeFavorite: (id: number) => void;
    isFavorite: (id: number) => boolean;
    toggleFavorite: (id: number) => void;
    syncWithServer: () => Promise<void>;
    clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
    persist(
        (set, get) => ({
            favoriteMovieIds: [],

            addFavorite: (id) => {
                const state = get();
                if (state.favoriteMovieIds.includes(id)) return;

                const newFavorites = [...state.favoriteMovieIds, id];
                set({ favoriteMovieIds: newFavorites });
            },

            removeFavorite: (id) => {
                const state = get();
                const newFavorites = state.favoriteMovieIds.filter((favId) => favId !== id);
                set({ favoriteMovieIds: newFavorites });
            },

            toggleFavorite: (id) => {
                const isCurrentlyFavorite = get().isFavorite(id);
                if (isCurrentlyFavorite) {
                    get().removeFavorite(id);
                } else {
                    get().addFavorite(id);
                }
            },

            syncWithServer: async () => {
                return Promise.resolve();
            },

            isFavorite: (id) => get().favoriteMovieIds.includes(id),
            clearFavorites: () => set({ favoriteMovieIds: [] }),
        }),
        {
            name: 'favorites-storage',
        }
    )
);