import styles from "./all-movies.module.css";
import { useMovies } from "../../shared/hooks/useMovie/useMovie.ts";
import { useState } from "react";
import MovieList from "./movie-list.tsx";
import Pagination from "./pagination.tsx";

const AllMovies = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const { data: moviesResponse, isLoading, error } = useMovies(currentPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    if (isLoading) {
        return <div className={styles.loader}>Загрузка...</div>;
    }

    if (error) {
        return <div className={styles.error}>Ошибка загрузки данных: {error.message}</div>;
    }

    if (!moviesResponse || moviesResponse.results.length === 0) {
        return <div className={styles.container}>Фильмы не найдены.</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>Все фильмы</h1>

            <MovieList movies={moviesResponse.results} />

            {moviesResponse.total_pages > 1 && (
                <Pagination
                    currentPage={moviesResponse.page}
                    totalPages={moviesResponse.total_pages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
};

export default AllMovies;