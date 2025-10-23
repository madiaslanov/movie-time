import styles from './movie-details.module.css'
import {useParams} from "react-router-dom";
import {useMovieDetails} from "../../shared/hooks/useMovieDetails/useMovieDetails.ts";


const MovieDetails = () => {
    const {id} = useParams<{id: number}>()
    const {data: movieDetails , isLoading, error} = useMovieDetails(id);
    return (
        <div className={styles.container}>

        </div>
    );
};

export default MovieDetails;