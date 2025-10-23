import styles from './movie-details.module.css';
import { useParams } from "react-router-dom";
import { useMovieDetails } from "../../shared/hooks/useMovieDetails/useMovieDetails.ts";

interface Genre {
    id: number;
    name: string;
}

const MovieDetails = () => {
    const { id: rawId } = useParams<{ id: string }>();
    const id = Number(rawId);

    const { data: movieDetails, isLoading, error } = useMovieDetails(id);
    console.log(movieDetails);
    if (isLoading) {
        return <div className={styles.statusMessage}>Loading movie details...</div>;
    }

    if (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return <div className={`${styles.statusMessage} ${styles.error}`}>Error: {errorMessage}</div>;
    }

    if (!movieDetails) {
        return <div className={styles.statusMessage}>Movie not found.</div>;
    }

    const imageBaseUrl = 'https://image.tmdb.org/t/p/';

    const formatCurrency = (amount: number) => {
        if (amount === 0) return "Not available";
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const formatRuntime = (minutes: number) => {
        if (!minutes || minutes === 0) return "N/A";
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        return `${h}h ${m}m`;
    }

    return (
        <div className={styles.container}>
            <div
                className={styles.backdrop}
                style={{backgroundImage: `url(${imageBaseUrl}w1280${movieDetails.backdrop_path})`}}
            />

            <div className={styles.content}>
                <div className={styles.poster}>
                    {movieDetails.poster_path ? (
                        <img src={`${imageBaseUrl}w500${movieDetails.poster_path}`} alt={movieDetails.title} />
                    ) : (
                        <div className={styles.noPoster}>No Poster Available</div>
                    )}
                </div>

                <div className={styles.details}>
                    <h1>{movieDetails.title} <span>({new Date(movieDetails.release_date).getFullYear()})</span></h1>

                    {movieDetails.tagline && <p className={styles.tagline}>"{movieDetails.tagline}"</p>}

                    <div className={styles.genres}>
                        {movieDetails.genres.map((genre: Genre) => (
                            <span key={genre.id} className={styles.genreTag}>{genre.name}</span>
                        ))}
                    </div>

                    <h3>Overview</h3>
                    <p className={styles.overview}>{movieDetails.overview || "No overview available."}</p>

                    <div className={styles.infoGrid}>
                        <div>
                            <strong>Status</strong>
                            <p>{movieDetails.status}</p>
                        </div>
                        <div>
                            <strong>Rating</strong>
                            <p>{movieDetails.vote_average.toFixed(1)} / 10 ({movieDetails.vote_count.toLocaleString()} votes)</p>
                        </div>
                        <div>
                            <strong>Runtime</strong>
                            <p>{formatRuntime(movieDetails.runtime)}</p>
                        </div>
                        <div>
                            <strong>Original Language</strong>
                            <p>{movieDetails.original_language.toUpperCase()}</p>
                        </div>
                        <div>
                            <strong>Budget</strong>
                            <p>{formatCurrency(movieDetails.budget)}</p>
                        </div>
                        <div>
                            <strong>Revenue</strong>
                            <p>{formatCurrency(movieDetails.revenue)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;