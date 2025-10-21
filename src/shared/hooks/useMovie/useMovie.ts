import {useQuery} from "@tanstack/react-query";
import {getMovies} from "../../api";


export const useMovies = () => useQuery({
    queryKey: ['movies'],
    queryFn: async () => getMovies(),
})