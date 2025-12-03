import {useQuery} from "@tanstack/react-query";
import {getMovieDetails} from "../../../services/movieService.ts";

export const useMovieDetails = (id: number | undefined) => useQuery({
    queryKey: ['movieDetails', id],

    queryFn: async () => {
        if (id === undefined) {
            throw new Error("Movie ID is required");
        }
        return getMovieDetails(id);
    },
    enabled: !!id,
});