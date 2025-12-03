import {useState} from "react";
import {IMAGE_BASE_URL} from "../../../shared/ui/image-url.ts";
import {useUpcomingMovie} from "../../../shared/hooks/useUpcomingMovie/useUpcomingMovie.ts";
import {useFavorites} from "../../../shared/hooks/useFavorites/useFavorites.ts";
import styles from "./upcoming-movies.module.css";
import {useNavigate} from "react-router-dom";
import type {IMovie} from "../../../shared/types/types.ts";
import {useAuthStore} from "../../../store/auth-store.ts";



const FavoriteButton = ({movieId}: { movieId: number }) => {
    const {isFavorite, toggleFavorite} = useFavorites();
    const isAuth = useAuthStore((state) => state.isAuthenticated);


    if (!isAuth) return null;

    return (
        <button
            className={`${styles.favButton} ${isFavorite(movieId) ? styles.isFavorite : ''}`}
            onClick={() => toggleFavorite(movieId)}
        >
            {isFavorite(movieId) ? '❤️' : '🤍'}
        </button>
    );
};


const UpcomingMovies = () => {
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const {data: movies, isLoading, isError} = useUpcomingMovie();
    const navigate = useNavigate();

    if (isLoading) return <div>Loading...</div>;
    if (isError || !movies) return <div>Error loading movies.</div>;

    return (
        <div className={styles.container}>
            {movies.map((movie: IMovie) => {
                const isHovered = hoveredId === movie.id;
                return (
                    <div
                        key={movie.id}
                        className={`${styles.movieCard} ${isHovered ? styles.expandedCard : ""}`}
                        onMouseEnter={() => setHoveredId(movie.id)}
                        onMouseLeave={() => setHoveredId(null)}
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
                                onClick={() => navigate(`movie/${movie.id}`)}
                            />
                            {isHovered && (
                                <div className={styles.overlayInfo}>
                                    <div className={styles.text}>
                                        <h3>{movie.title}</h3>
                                        <div className={styles.descriptionButtons}>
                                            <button
                                                onClick={() => navigate(`movie/${movie.id}`)}
                                            >
                                                Подробнее
                                            </button>
                                            <FavoriteButton movieId={movie.id}/>
                                        </div>
                                        <p>⭐ {(movie.vote_average).toFixed(1)}</p>
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