import { useQuery } from "@tanstack/react-query";
import apiClient from "../../backend/apiClient";

export function useSearchMovies(q: string, limit?: number) {
  return useQuery({
    queryKey: ["search-movies", q, limit],
    queryFn: () => apiClient.searchMovies(q, limit),
    enabled: !!q,
  });
}
