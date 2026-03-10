import { useMutation } from "@tanstack/react-query";
import apiClient from "../../backend/apiClient";
import { useNavigate } from "react-router";

export function useRegister() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (credentials: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    }) => apiClient.register(credentials),
    onSuccess: () => {
      navigate("/?showLogin=true");
    },

    onError: (error: Error) => {
      console.error("Registration failed:", error.message);
    },
  });
}
