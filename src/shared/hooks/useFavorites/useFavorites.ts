import {useFavoritesStore} from "../../../store/favorites-store.ts";


export const useFavorites = () => {
    const isFavorite = useFavoritesStore((state) => state.isFavorite);
    const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

    return {isFavorite, toggleFavorite};
};