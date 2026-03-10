import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../backend/apiClient";

export function useUpdateWatchPosition() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: { movieId: string; positionSeconds: number }) =>
      apiClient.updateWatchPosition(
        credentials.movieId,
        credentials.positionSeconds,
      ),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["watchProgress", variables.movieId], {
        position_seconds: data.data.position_seconds,
        last_watched: data.data.updated_at,
      });
    },
  });
}
