import { create } from 'zustand';
import { persist } from 'zustand/middleware';
// ==> Импортируем наши новые функции для работы с бэкендом
import { getFavoritesFromDB, updateFavoritesInDB } from '../services/favoritesService';

interface FavoritesState {
    favoriteMovieIds: number[];
    addFavorite: (id: number, userId?: string) => Promise<void>;
    removeFavorite: (id: number, userId?: string) => Promise<void>;
    isFavorite: (id: number) => boolean;
    toggleFavorite: (id: number, userId?: string) => void;
    // ==> Переименовываем sync-функцию для ясности
    syncWithServer: () => Promise<void>;
    clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
    persist(
        (set, get) => ({
            favoriteMovieIds: [],

            // --- ОБНОВЛЕННАЯ ЛОГИКА С API ---
            addFavorite: async (id, userId) => {
                const state = get();
                if (state.favoriteMovieIds.includes(id)) return;

                const newFavorites = [...state.favoriteMovieIds, id];
                set({ favoriteMovieIds: newFavorites }); // 1. Мгновенно обновляем UI

                if (userId) {
                    try {
                        await updateFavoritesInDB(newFavorites); // 2. Отправляем полный список на сервер
                    } catch (error) {
                        // Если ошибка, откатываем изменение в UI
                        set({ favoriteMovieIds: state.favoriteMovieIds });
                        console.error("Ошибка при добавлении в избранное на сервере", error);
                    }
                }
            },

            removeFavorite: async (id, userId) => {
                const state = get();
                const newFavorites = state.favoriteMovieIds.filter((favId) => favId !== id);
                set({ favoriteMovieIds: newFavorites }); // 1. Мгновенно обновляем UI

                if (userId) {
                    try {
                        await updateFavoritesInDB(newFavorites); // 2. Отправляем полный список на сервер
                    } catch (error) {
                        // Если ошибка, откатываем изменение в UI
                        set({ favoriteMovieIds: state.favoriteMovieIds });
                        console.error("Ошибка при удалении из избранного на сервере", error);
                    }
                }
            },

            toggleFavorite: (id, userId) => {
                const isCurrentlyFavorite = get().isFavorite(id);
                if (isCurrentlyFavorite) {
                    get().removeFavorite(id, userId);
                } else {
                    get().addFavorite(id, userId);
                }
            },

            // --- НОВАЯ ЛОГИКА СИНХРОНИЗАЦИИ ПРИ ВХОДЕ С НАШИМ БЭКЕНДОМ ---
            syncWithServer: async () => {
                try {
                    const serverFavorites = await getFavoritesFromDB();
                    const localFavorites = get().favoriteMovieIds;

                    const mergedFavorites = [...new Set([...localFavorites, ...serverFavorites])];

                    set({ favoriteMovieIds: mergedFavorites });

                    await updateFavoritesInDB(mergedFavorites);
                } catch (error) {
                    console.log("Не удалось синхронизировать избранное. Возможно, пользователь не авторизован.");
                }
            },

            isFavorite: (id) => get().favoriteMovieIds.includes(id),
            clearFavorites: () => set({ favoriteMovieIds: [] }),
        }),
        {
            name: 'favorites-storage',
        }
    )
);