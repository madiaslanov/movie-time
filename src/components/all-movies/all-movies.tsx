import styles from "./all-movies.module.css";
import {useMovies} from "../../shared/hooks/useMovie/useMovie.ts";
import {useSearchParams} from "react-router-dom";
import {useDebounce} from "../../shared/hooks/useDebounce/useDebounce.ts";
import MovieList from "./movie-list.tsx";
import Pagination from "./pagination.tsx";

const AllMovies = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;
    const query = searchParams.get('query') || '';

    const debouncedQuery = useDebounce(query, 500);

    const {data: moviesResponse, isLoading, error} = useMovies(currentPage, debouncedQuery);

    const handlePageChange = (page: number) => {
        setSearchParams({page: String(page), query});
        window.scrollTo(0, 0);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchParams({page: '1', query: event.target.value});
    };

    if (isLoading && !moviesResponse) {
        return <div className={styles.loader}>Загрузка...</div>;
    }

    if (error) {
        return <div className={styles.error}>Ошибка загрузки данных: {error.message}</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>Все фильмы</h1>

            <div className={styles.searchBar}>
                <input
                    type="text"
                    value={query}
                    onChange={handleSearchChange}
                    placeholder="Искать фильмы..."
                    className={styles.searchInput}
                />
            </div>

            {moviesResponse && moviesResponse.results.length > 0 ? (
                <>
                    <MovieList movies={moviesResponse.results}/>
                    {moviesResponse.total_pages > 1 && (
                        <Pagination
                            currentPage={moviesResponse.page}
                            totalPages={moviesResponse.total_pages}
                            onPageChange={handlePageChange}
                        />
                    )}
                </>
            ) : (
                <div className={styles.noResults}>Фильмы не найдены.</div>
            )}
        </div>
    );
};

export default AllMovies;