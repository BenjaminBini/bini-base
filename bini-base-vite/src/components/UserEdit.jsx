import { useSaveUser, useUser } from "../api/user-api.js";
import { Stack, Title } from "@mantine/core";
import UserForm from "./UserForm.jsx";
import { notifications } from "@mantine/notifications";
import { useRoles } from "../api/role-api.js";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";

export default function UserEdit() {
  const { userId } = useParams();
  const { data: user } = useUser(userId);
  const { data: roles } = useRoles(0, 1000);
  const queryClient = useQueryClient();
  const saveUser = useSaveUser(queryClient);

  const allRoles =
    roles != null
      ? roles.map((role) => {
          return { id: role.id, value: role.code, label: role.label };
        })
      : [];
  const onSubmit = async (user) => {
    await saveUser.mutateAsync({ id: userId, ...user });
    notifications.show({
      title: "User saved",
      message: `User ${user.username} has been saved`,
    });
  };

  return (
    <Stack>
      <Title>User {user?.username}</Title>
      {user && <UserForm user={user} allRoles={allRoles} onSubmit={onSubmit} />}
    </Stack>
  );
}
