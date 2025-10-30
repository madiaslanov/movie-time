export const BASE_API = "https://api.themoviedb.org/3/";
const API_TOKEN = import.meta.env.VITE_TOKEN;

interface IMoviesResponse {
    page: number;
    results: any[];
    total_pages: number;
    total_results: number;
}

export const getMovies = async (page: number = 1): Promise<IMoviesResponse> => {
    if (!API_TOKEN) {
        throw new Error("VITE_TOKEN не найден...");
    }

    const response = await fetch(`${BASE_API}movie/popular?page=${page}`, {
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

    const data: IMoviesResponse = await response.json();

    return data;
};
export const getUpcomingMovies = async () => {
    if (!API_TOKEN) {
        throw new Error("VITE_TOKEN не найден в переменных окружения. Убедитесь, что он есть в вашем .env файле.");
    }

    const response = await fetch(BASE_API + `movie/upcoming`, {
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

    const data = await response.json();
    return data.results;
};

export const getPeople = async () => {
    if (!API_TOKEN) {
        throw new Error("VITE_TOKEN не найден в переменных окружения. Убедитесь, что он есть в вашем .env файле.");
    }

    const response = await fetch(BASE_API + `person/popular`, {
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

    const data = await response.json();
    return data.results;
};

export const getMovieDetails = async (movie_id:number | undefined) => {
    if (!API_TOKEN) {
        throw new Error("VITE_TOKEN не найден в переменных окружения. Убедитесь, что он есть в вашем .env файле.");
    }

    const response = await fetch(BASE_API + `movie/${movie_id}`, {
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

    const data = await response.json();
    return data;
};

export const getPeopleDetails = async (person_id:number | undefined) => {
    if (!API_TOKEN) {
        throw new Error("VITE_TOKEN не найден в переменных окружения. Убедитесь, что он есть в вашем .env файле.");
    }

    const response = await fetch(BASE_API + `person/${person_id}`, {
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

    const data = await response.json();
    return data;
};
