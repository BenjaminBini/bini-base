import axiosInstance from "./axios-config.js";
import { useMutation, useQuery } from "react-query";

export function useTeams(page, delta) {
  return useQuery(["teams", page, delta], async () => {
    const { data } = await axiosInstance.get(
      `/api/team?page=${page}&delta=${delta}`,
    );
    return data;
  });
}

export function useTeam(teamId) {
  return useQuery(["teams", teamId], async () => {
    const { data } = await axiosInstance.get(`/api/team/${teamId}`);
    return data.data;
  });
}

export function useSaveTeam(queryClient) {
  return useMutation(
    async (team) => {
      const { data } = await axiosInstance.post("/api/team", team);
      return data.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("teams");
      },
    },
  );
}

export function useDeleteTeam(queryClient) {
  return useMutation((teamId) => axiosInstance.delete(`/api/team/${teamId}`), {
    onSuccess: () => {
      queryClient.invalidateQueries("teams");
    },
  });
}

export function useDeleteTeams(queryClient) {
  return useMutation(
    (teamIds) => axiosInstance.post(`/api/team/delete`, teamIds),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("teams");
      },
    },
  );
}
