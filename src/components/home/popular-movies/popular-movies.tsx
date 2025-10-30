import styles from "./popular-movies.module.css";
import { useMovies } from "../../../shared/hooks/useMovie/useMovie.ts";
import { useRef, useEffect } from "react";
import { TextCustom } from "../../../shared/ui/text-custom/text-custom.tsx";
import { IMAGE_BASE_URL } from "../../../shared/ui/image-url.ts";
import {useNavigate} from "react-router-dom";

interface popularMovieType {
    id: number;
    title: string;
    backdrop_path: string;
    overview: string;
    name: string;
}

const PopularMovies = () => {
    const { data: movies, isLoading, error } = useMovies(page);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const handleWheel = (e: WheelEvent) => {
            if (container.scrollWidth > container.clientWidth) {
                e.preventDefault();
                container.scrollLeft += e.deltaY;
            }
        };
        container.addEventListener('wheel', handleWheel, { passive: false });
        return () => {
            container.removeEventListener('wheel', handleWheel);
        };
    }, []);

    if (isLoading) {
        return <div>Загрузка...</div>;
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
                {movies?.map((movie: popularMovieType) => (
                    <div key={movie.id} className={styles.movieCard}>
                        <div className={styles.cardContent}>
                            <img
                                src={IMAGE_BASE_URL + `${movie.backdrop_path}`}
                                alt={`Постер фильма ${movie.title || movie.name}`}
                                onClick={() => navigate(`movie/${movie.id}`)}
                            />
                            <div className={styles.infoBox}>
                                <TextCustom size="l" weight="bold">
                                    {movie.title || movie.name}
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
                ))}
            </div>
        </div>
    );
};

export default PopularMovies;