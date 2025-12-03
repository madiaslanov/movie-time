import {useQuery} from "@tanstack/react-query";
import {getUpcomingMovies} from "../../../services/movieService.ts";


export const useUpcomingMovie = () => useQuery({
    queryKey: ['upcomingMovies'],
    queryFn: async () => getUpcomingMovies(),
})