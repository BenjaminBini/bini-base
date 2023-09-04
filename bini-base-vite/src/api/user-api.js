import axiosInstance from "./axios-config.js";
import { useMutation, useQuery } from "react-query";

export function useUsers(page, delta) {
  return useQuery(["users", page, delta], async () => {
    const { data } = await axiosInstance.get(
      `/api/user?page=${page}&delta=${delta}`,
    );
    return data;
  });
}

export function useUser(userId) {
  return useQuery({
    queryKey: ["users", userId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/user/${userId}`);
      return data.data;
    },
    keepPreviousData: true,
  });
}

export function useFindUsersByUserName(userName, page, delta) {
  return useQuery({
    queryKey: ["users", userName],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/api/user?username=${userName}&page=${page}&delta=${delta}`,
      );
      return data.data;
    },
    keepPreviousData: true,
    enabled: userName.length > 0,
  });
}

export function useCurrentUser() {
  return useQuery({
    queryKey: "currentUser",
    queryFn: async () => {
      const { data } = await axiosInstance.get("/api/user/current");

      return data.data;
    },
    retry: false,
  });
}

export function useLogin() {
  return useMutation(async (user) => {
    const params = new URLSearchParams();
    params.append("username", user.username);
    params.append("password", user.password);
    return await axiosInstance.post("/login", params);
  });
}

export function useSaveUser(queryClient) {
  return useMutation(
    async (user) => {
      const { data } = await axiosInstance.post("/api/user", user);
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
  return useMutation((userId) => axiosInstance.delete(`/api/user/${userId}`), {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });
}

export function useDeleteUsers(queryClient) {
  return useMutation(
    (userIds) => axiosInstance.post(`/api/user/delete`, userIds),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      },
    },
  );
}
