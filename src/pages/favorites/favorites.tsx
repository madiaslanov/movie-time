import { useQuery } from '@tanstack/react-query';
import { getMovieDetails } from '../../services/movieService.ts';
import styles from './favorites.module.css';
import MovieCard from '../../components/all-movies/movie-card.tsx';
import type { IMovie } from '../../shared/types/types.ts';
import {useFavoritesStore} from "../../store/favorites-store.ts";

const Favorites = () => {
    const { favoriteMovieIds } = useFavoritesStore();

    const { data: favoriteMovies, isLoading } = useQuery<IMovie[]>({
        queryKey: ['favorites', favoriteMovieIds],
        queryFn: () => Promise.all(favoriteMovieIds.map(id => getMovieDetails(id))),
        enabled: favoriteMovieIds.length > 0,
    });

    if (isLoading) {
        return <div className={styles.status}>Loading favorites...</div>;
    }

    if (!favoriteMovies || favoriteMovies.length === 0) {
        return <div className={styles.status}>You have no favorite movies yet.</div>;
    }

    return (
        <div className={styles.container}>
            <h1>My Favorites</h1>
            <div className={styles.movieGrid}>
                {favoriteMovies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default Favorites;