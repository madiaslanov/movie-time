import styles from "./popular-movies.module.css"
import {useMovies} from "../../../shared/hooks/useMovie/useMovie.ts";
import {useRef, useState} from "react";
import {TextCastom} from "../../../shared/ui/text-castom/text-castom.tsx";
import {IMAGE_BASE_URL} from "../../../shared/ui/image-url.ts";

interface popularMovieType {
    id: number;
    title: string;
    backdrop_path: string;
    overview: string;
    name: string;
}


const PopularMovies = () => {
    const {data: movies, isLoading, error} = useMovies();
    const [hoveredMovieId, setHoveredMovieId] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const handleWheel = (e: React.WheelEvent) => {
        if (containerRef.current) {
            e.preventDefault();
            containerRef.current.scrollLeft += e.deltaY;
        }
    };



    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Произошла ошибка: {error.message}</div>;
    }

    return (
        <div
            ref={containerRef}
            className={styles.container}
            onWheel={handleWheel}
        >
            {movies?.map((movie: popularMovieType) => (
                <div
                    key={movie.id}
                    className={styles.movieCard}
                    onMouseEnter={() => setHoveredMovieId(movie.id)}
                    onMouseLeave={() => setHoveredMovieId(null)}
                >
                    <img
                        src={IMAGE_BASE_URL + `${movie.backdrop_path}`}
                        alt={`Постер фильма ${movie.title || movie.name}`}
                    />

                    {hoveredMovieId === movie.id && movie.overview && (
                        <div className={styles.infoBox}>
                            <TextCastom size="l" weight="bold">
                                {movie.title || movie.name}
                            </TextCastom>

                            <TextCastom
                                size="m"
                                weight="regular"
                                className={styles.overviewText}
                            >
                                {movie.overview}
                            </TextCastom>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default PopularMovies;