import styles from "./all-movies.module.css";
import type { IMovie } from "../../shared/types/types.ts";
import MovieCard from "./movie-card.tsx";
import { Link } from "react-router-dom";

interface MovieListProps {
    movies: IMovie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
    return (
        <div className={styles.movieGrid}>
            {movies.map(movie => (
                <Link
                    key={movie.id}
                    to={`/movie/${movie.id}`}
                    className={styles.movieLink}
                >
                    <MovieCard movie={movie} />
                </Link>
            ))}
        </div>
    );
};

export default MovieList;