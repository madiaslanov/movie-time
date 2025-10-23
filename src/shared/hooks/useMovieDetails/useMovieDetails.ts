import {useQuery} from "@tanstack/react-query";
import {getMovieDetails} from "../../api";


export const useMovieDetails = (id: number | undefined) => useQuery({
    queryKey: ['movieDetails', id],
    queryFn: async () => getMovieDetails(id),
    enabled: !!id
})