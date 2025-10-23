import {useState} from "react";
import {IMAGE_BASE_URL} from "../../../shared/ui/image-url.ts";
import {useUpcomingMovie} from "../../../shared/hooks/useUpcomingMovie/useUpcomingMovie.ts";
import styles from "./upcoming-movies.module.css";
import {useNavigate} from "react-router-dom";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
    overview: string;
    vote_average: number;
    release_date: string;
}

const UpcomingMovies = () => {
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const {data: movies, isLoading, isError} = useUpcomingMovie();
    const navigate = useNavigate();
    if (isLoading) return <div>Loading...</div>;
    if (isError || !movies) return <div>Error loading movies.</div>;


    return (
        <div className={styles.container}>
            {movies.map((movie: Movie) => {
                const isHovered = hoveredId === movie.id;
                return (
                    <div
                        key={movie.id}
                        className={`${styles.movieCard} ${isHovered ? styles.expandedCard : ""}`}
                        onMouseEnter={() => setHoveredId(movie.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        onClick={() => navigate(`movie/${movie.id}`)}
                    >
                        <div className={styles.imageWrapper}>
                            <img
                                src={IMAGE_BASE_URL + movie.poster_path}
                                alt={movie.title}
                                className={`${styles.movieImage} ${isHovered ? styles.hiddenImage : styles.visibleImage}`}
                            />
                            <img
                                src={IMAGE_BASE_URL + movie.backdrop_path}
                                alt={movie.title}
                                className={`${styles.movieImage} ${isHovered ? styles.visibleImage : styles.hiddenImage}`}
                            />
                            {isHovered && (
                                <div className={styles.overlayInfo}>
                                    <div className={styles.text}>
                                        <h3>{movie.title}</h3>
                                        <div className={styles.descriptionButtons}>
                                            <button>
                                                Подробнее
                                            </button>
                                            <button>
                                                +
                                            </button>
                                        </div>
                                        <p>⭐ {movie.vote_average}</p>
                                        <p>{movie.release_date}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
export default UpcomingMovies;
