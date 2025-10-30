// MovieList.tsx
import styles from "./all-movies.module.css";
import type { IMovie } from "../../shared/types/types.ts";
import MovieCard from "./movie-card.tsx";

interface MovieListProps {
    movies: IMovie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
    return (
        <div className={styles.movieGrid}>
            {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
};

export default MovieList;