export interface IMovie {
    id: number;
    title: string;
    poster_path: string | null;
    release_date: string;
    vote_average: number;
    overview: string;
    backdrop_path: string | null;
}

export interface IMoviesResponse {
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;
}
export interface LoginForm {
    email: string;
    password: string;
}

// Тип для формы регистрации
export interface SignupForm {
    email: string;
    password: string;
}