// services/favoritesService.ts
import apiClient from './apiClient';

export const getFavoritesFromDB = async (): Promise<number[]> => {
    try {
        const response = await apiClient.get('/favorites');
        return response.data.movieIds;
    } catch (error) {
        console.error("Failed to fetch favorites", error);
        throw error;
    }
};

export const updateFavoritesInDB = async (movieIds: number[]): Promise<void> => {
    try {
        await apiClient.post('/favorites', { movieIds }); // Предполагаем, что есть такой роут на бэкенде
    } catch (error) {
        console.error("Failed to update favorites", error);
        throw error;
    }
};