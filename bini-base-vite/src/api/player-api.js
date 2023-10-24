import axiosInstance from "./axios-config.js";
import { useMutation, useQuery } from "react-query";

export function usePlayers(page, delta) {
  return useQuery(["players", page, delta], async () => {
    const { data } = await axiosInstance.get(
      `/api/player?page=${page}&delta=${delta}`,
    );
    return data;
  });
}

export function usePlayer(playerId) {
  return useQuery(["players", roleId], async () => {
    const { data } = await axiosInstance.get(`/api/player/${roleId}`);
    return data.data;
  });
}

export function useSavePlayer(queryClient) {
  return useMutation(
    async (player) => {
      const { data } = await axiosInstance.post("/api/player", player);
      return data.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("players");
        queryClient.invalidateQueries("teams");
      },
    },
  );
}

export function useDeletePlayer(queryClient) {
  return useMutation(
    (playerId) => axiosInstance.delete(`/api/player/${playerId}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("players");
        queryClient.invalidateQueries("teams");
      },
    },
  );
}

export function useDeletePlayers(queryClient) {
  return useMutation(
    (playerIds) => axiosInstance.post(`/api/player/delete`, playerIds),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("players");
      },
    },
  );
}
