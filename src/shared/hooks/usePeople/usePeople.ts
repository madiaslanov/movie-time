import {useQuery} from "@tanstack/react-query";
import {getPeople} from "../../../services/movieService.ts";


export const usePeople = () => useQuery({
    queryKey: ['famousPeople'],
    queryFn: async () => getPeople(),
})