import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {getMovies} from "../../../services/movieService.ts";
import type {IMoviesResponse} from "../../types/types.ts";

export const useMovies = (page: number, query: string) => {
    return useQuery<IMoviesResponse, Error>({
        queryKey: ['movies', page, query],
        queryFn: () => getMovies(page, query),
        placeholderData: keepPreviousData
    });
};