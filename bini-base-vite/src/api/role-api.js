import axiosInstance from "./axios-config.js";
import { useMutation, useQuery } from "react-query";

export function useRoles() {
  return useQuery("roles", async () => {
    const { data } = await axiosInstance.get("/api/role");
    return data.data;
  });
}

export function useRole(roleId) {
  return useQuery(["roles", roleId], async () => {
    const { data } = await axiosInstance.get(`/api/role/${roleId}`);
    return data.data;
  });
}

export function useSaveRole(queryClient) {
  return useMutation(
    async (role) => {
      const { data } = await axiosInstance.post("/api/role", role);
      return data.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("roles");
      },
    },
  );
}

export function useDeleteRole(queryClient) {
  return useMutation((roleId) => axiosInstance.delete(`/api/role/${roleId}`), {
    onSuccess: () => {
      queryClient.invalidateQueries("roles");
    },
  });
}

export function useDeleteRoles(queryClient) {
  return useMutation(
    (roleIds) => axiosInstance.post(`/api/role/delete`, roleIds),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("roles");
      },
    },
  );
}
