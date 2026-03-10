import { useQuery } from "@tanstack/react-query";
import apiClient from "../../backend/apiClient";

export function useCategories(){
    return useQuery({
        queryKey: ["categories"],
        queryFn: ()=> apiClient.getCategories(),
    })
}