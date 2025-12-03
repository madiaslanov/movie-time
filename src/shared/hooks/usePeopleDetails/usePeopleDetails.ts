import {useQuery} from "@tanstack/react-query";
import {getPeopleDetails} from "../../../services/movieService.ts";


export const usePeopleDetails = (id: number | undefined) => useQuery({
    queryKey: ['peopleDetails', id],
    queryFn: async () => {
        if (id === undefined) {
            throw new Error("People ID is required");
        }
        return getPeopleDetails(id);
    },
    enabled: !!id
})
