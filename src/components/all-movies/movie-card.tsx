import styles from "./all-movies.module.css";
import type {IMovie} from "../../shared/types/types.ts";

interface MovieCardProps {
    movie: IMovie;
}

const MovieCard: React.FC<MovieCardProps> = ({movie}) => {
    const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

    const posterUrl = movie.poster_path
        ? `${IMAGE_BASE_URL}${movie.poster_path}`
        : 'https://via.placeholder.com/500x750.png?text=No+Image';

    const rating = parseFloat(movie.vote_average.toString()).toFixed(1);

    const getRatingColor = (r: number) => {
        if (r >= 7) return styles.ratingGood;
        if (r >= 5) return styles.ratingMedium;
        return styles.ratingBad;
    };

    return (
        <div className={styles.movieCard}>
            <img src={posterUrl} alt={movie.title} className={styles.poster}/>
            <div className={`${styles.rating} ${getRatingColor(Number(rating))}`}>
                {rating}
            </div>
            <div className={styles.cardInfo}>
                <h3 className={styles.cardTitle}>{movie.title}</h3>
                <p className={styles.cardDate}>{new Date(movie.release_date).getFullYear() || 'N/A'}</p>
            </div>
        </div>
    );
};

export default MovieCard;