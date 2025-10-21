import {useQuery} from "@tanstack/react-query";
import { getUpcomingMovies} from "../../api";


export const useUpcomingMovie = () => useQuery({
    queryKey: ['upcomingMovies'],
    queryFn: async () => getUpcomingMovies(),
})