// useTrendingMovies.ts
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../backend/apiClient";

export function useTrendingMovies(limit?: number) {
  return useQuery({
    queryKey: ["trending-movies", limit],
    queryFn: () => apiClient.getTrendingMovies(limit),
  });
}
