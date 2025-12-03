const API_TOKEN = import.meta.env.VITE_TOKEN;
export const BASE_API = "https://api.themoviedb.org/3/";

const apiFetch = async (endpoint: string) => {
    if (!API_TOKEN) {
        throw new Error("VITE_TOKEN не найден...");
    }

    const response = await fetch(`${BASE_API}${endpoint}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + API_TOKEN,
        }
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.status_message || response.statusText;
        throw new Error(`Ошибка API: ${errorMessage}`);
    }

    return response.json();
};

export const getMovies = (page: number = 1, query: string = "") => {
    if (query) {
        return apiFetch(`search/movie?query=${encodeURIComponent(query)}&page=${page}`);
    }
    return apiFetch(`movie/popular?page=${page}`);
};

export const getUpcomingMovies = () => apiFetch('movie/upcoming').then(data => data.results);

export const getPeople = () => apiFetch('person/popular').then(data => data.results);

export const getMovieDetails = (movieId: number) => apiFetch(`movie/${movieId}`);

export const getPeopleDetails = (personId: number) => apiFetch(`person/${personId}`);