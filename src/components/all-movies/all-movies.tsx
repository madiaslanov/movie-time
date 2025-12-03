import styles from "./all-movies.module.css";
import {useMovies} from "../../shared/hooks/useMovie/useMovie.ts";
import {useSearchParams} from "react-router-dom";
import {useDebounce} from "../../shared/hooks/useDebounce/useDebounce.ts";
import MovieList from "./movie-list.tsx";
import Pagination from "./pagination.tsx";
import {useTranslation} from "react-i18next";

const AllMovies = () => {
    const {t} = useTranslation(); // 2. Инициализируем хук
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

    // Показываем лоадер только при самой первой загрузке
    if (isLoading && !moviesResponse) {
        return <div className={styles.loader}>{t('allMovies.loading')}</div>; // 3. Переводим текст
    }

    if (error) {
        return <div className={styles.error}>{t('allMovies.error')}: {error.message}</div>; // 3. Переводим текст
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>{t('allMovies.title')}</h1> {/* 3. Переводим текст */}

            <div className={styles.searchBar}>
                <input
                    type="text"
                    value={query}
                    onChange={handleSearchChange}
                    placeholder={t('allMovies.searchPlaceholder')} // 3. Переводим placeholder
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
                <div className={styles.noResults}>{t('allMovies.noMovies')}</div> // 3. Переводим текст
            )}
        </div>
    );
};

export default AllMovies;