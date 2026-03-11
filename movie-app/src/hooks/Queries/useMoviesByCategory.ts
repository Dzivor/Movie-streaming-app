import { useQuery } from "@tanstack/react-query";
import apiClient from "../../backend/apiClient";

export function useMoviesByCategory(categoryId?: string) {
  return useQuery({
    queryKey: ["movies", categoryId],
    queryFn: () => apiClient.getMoviesByCategory(categoryId!),
    enabled: !!categoryId,
  });
}
