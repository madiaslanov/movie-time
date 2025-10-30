import {useQuery} from "@tanstack/react-query";
import {getPeopleDetails} from "../../api";


export const usePeopleDetails = (id: number | undefined) => useQuery({
    queryKey: ['peopleDetails', id],
    queryFn: async () => getPeopleDetails(id),
    enabled: !!id
})
