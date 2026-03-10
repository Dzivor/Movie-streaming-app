import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import apiClient from "../../backend/apiClient";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      apiClient.login(credentials),
    onSuccess: (data) => {
      queryClient.setQueryData(["auth", "me"], { user: data.user });

      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/Movies");
      }
    },
  });
}