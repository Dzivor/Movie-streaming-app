import { useQuery } from "@tanstack/react-query";
import apiClient from "../../backend/apiClient";

export function useMovie(id?: string) {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: () => apiClient.getMovie(id!),
    enabled: !!id,
  });
}
