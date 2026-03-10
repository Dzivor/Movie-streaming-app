import { useQuery } from "@tanstack/react-query";
import apiClient from "../../backend/apiClient";

export function useAuth() {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: () => apiClient.getMe(),
    retry: false,
    enabled: !!localStorage.getItem("accessToken"),
  });
}
