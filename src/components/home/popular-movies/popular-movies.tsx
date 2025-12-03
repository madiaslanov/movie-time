import styles from "./popular-movies.module.css";
import {useMovies} from "../../../shared/hooks/useMovie/useMovie.ts";
import {useRef, useEffect} from "react";
import {TextCustom} from "../../../shared/ui/text-custom/text-custom.tsx";
import {IMAGE_BASE_URL} from "../../../shared/ui/image-url.ts";
import {Link} from "react-router-dom";
import type {IMovie} from "../../../shared/types/types.ts";

const PopularMovies = () => {
    const {data: moviesResponse, isLoading, error} = useMovies(1, '');
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const handleWheel = (e: WheelEvent) => {
            if (container.scrollWidth > container.clientWidth) {
                e.preventDefault();
                container.scrollLeft += e.deltaY;
            }
        };
        container.addEventListener('wheel', handleWheel, {passive: false});
        return () => {
            container.removeEventListener('wheel', handleWheel);
        };
    }, []);

    if (isLoading) {
        return <div>Загрузка популярных фильмов...</div>;
    }

    if (error) {
        return <div>Произошла ошибка: {error.message}</div>;
    }

    return (
        <div className={styles.containerWrapper}>
            <div
                ref={containerRef}
                className={styles.container}
            >
                {moviesResponse?.results.map((movie: IMovie) => (

                    <Link key={movie.id} to={`/movie/${movie.id}`} className={styles.movieLink}>
                        <div className={styles.movieCard}>
                            <div className={styles.cardContent}>
                                <img
                                    src={IMAGE_BASE_URL + `${movie.backdrop_path}`}
                                    alt={`Постер фильма ${movie.title}`}
                                    // 3. Убираем onClick отсюда
                                />
                                <div className={styles.infoBox}>
                                    <TextCustom size="l" weight="bold">
                                        {movie.title}
                                    </TextCustom>
                                    {movie.overview && (
                                        <TextCustom
                                            size="m"
                                            weight="regular"
                                            className={styles.overviewText}
                                        >
                                            {movie.overview}
                                        </TextCustom>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default PopularMovies;