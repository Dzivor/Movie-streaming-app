import { useQuery } from "@tanstack/react-query";
import apiClient from "../../backend/apiClient";

export function useCategory(id?: string) {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => apiClient.getCategory(id!),
    enabled: !!id,
  });
}
