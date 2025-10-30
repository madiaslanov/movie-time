import {useQuery} from "@tanstack/react-query";
import {getMovies} from "../../api";
import type {IMoviesResponse} from "../../types/types.ts";


export const useMovies = (page: number) => {
    return useQuery<IMoviesResponse, Error>({
        queryKey: ['movies', page],

        queryFn: () => getMovies(page),

        keepPreviousData: true,
    });
}