import {create} from 'zustand';
import {persist} from 'zustand/middleware';


interface FavoritesState {
    favoriteMovieIds: number[];
    addFavorite: (id: number) => void;
    removeFavorite: (id: number) => void;
    isFavorite: (id: number) => boolean;
    toggleFavorite: (id: number) => void;
}


export const useFavoritesStore = create<FavoritesState>()(
    persist(
        (set, get) => ({
            favoriteMovieIds: [],

            addFavorite: (id) =>
                set((state) => ({
                    favoriteMovieIds: [...state.favoriteMovieIds, id],
                })),

            removeFavorite: (id) =>
                set((state) => ({
                    favoriteMovieIds: state.favoriteMovieIds.filter((favId) => favId !== id),
                })),

            isFavorite: (id) => get().favoriteMovieIds.includes(id),

            toggleFavorite: (id) => {
                const isCurrentlyFavorite = get().isFavorite(id);
                if (isCurrentlyFavorite) {
                    get().removeFavorite(id);
                } else {
                    get().addFavorite(id);
                }
            },
        }),
        {
            name: 'favorites-storage',
        }
    )
);