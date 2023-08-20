import axiosInstance from "./axios-config.js";
import { useMutation, useQuery } from "react-query";

export function useUsers() {
  return useQuery("users", async () => {
    const { data } = await axiosInstance.get("/user");
    return data.data;
  });
}

export function useUser(userId) {
  return useQuery(["users", userId], async () => {
    const { data } = await axiosInstance.get(`/user/${userId}`);
    return data.data;
  });
}

export function useSaveUser(queryClient) {
  return useMutation(
    async (user) => {
      const { data } = await axiosInstance.post("/user", user);
      return data.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      },
    },
  );
}
/*

export function useUpdateUser(queryClient) {
  return useMutation((user) => axiosInstance.put("/user", user), {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });
}
*/

export function useDeleteUser(queryClient) {
  return useMutation((userId) => axiosInstance.delete(`/user/${userId}`), {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });
}

export function useDeleteUsers(queryClient) {
  return useMutation((userIds) => axiosInstance.post(`/user/delete`, userIds), {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });
}
