import {useQuery} from "@tanstack/react-query";
import { getPeople } from "../../api";


export const usePeople = () => useQuery({
    queryKey: ['famousPeople'],
    queryFn: async () => getPeople(),
})