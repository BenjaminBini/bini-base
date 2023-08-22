import axiosInstance from "./axios-config.js";
import { useMutation, useQuery } from "react-query";

export function useUsers() {
  return useQuery("users", async () => {
    const { data } = await axiosInstance.get("/api/user");
    return data.data;
  });
}

export function useUser(userId) {
  return useQuery(["users", userId], async () => {
    const { data } = await axiosInstance.get(`/api/user/${userId}`);
    return data.data;
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
