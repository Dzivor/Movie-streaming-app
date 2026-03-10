import { useQuery } from "@tanstack/react-query";
import apiClient from "../../backend/apiClient";

export function useWatchProgress(movieId?: string) {
    return useQuery({
        queryKey: ["watchProgress", movieId],
        queryFn: () => apiClient.getWatchProgress(movieId!),
        enabled: !!movieId,
    })
}