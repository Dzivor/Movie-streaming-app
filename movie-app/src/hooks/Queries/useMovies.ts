import { useQuery } from "@tanstack/react-query";
import apiClient from "../../backend/apiClient";

export function useMovies(params?: {
  page?: number;
  limit?: number;
  category?: string;
}) {
  return useQuery({
    queryKey: ["movies", params],
    queryFn: () => apiClient.getMovies(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
