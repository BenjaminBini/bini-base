import { useSaveUser } from "../api/user-api.js";
import { Stack, Title } from "@mantine/core";
import UserForm from "./UserForm.jsx";
import { notifications } from "@mantine/notifications";
import { useRoles } from "../api/role-api.js";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";

export default function UserNew() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: roles } = useRoles();
  const saveUser = useSaveUser(queryClient);

  const allRoles =
    roles != null
      ? roles.map((role) => {
          return { id: role.id, value: role.code, label: role.label };
        })
      : [];
  const onSubmit = async (user) => {
    const savedUser = await saveUser.mutateAsync(user);
    notifications.show({
      title: "User created",
      message: `User ${savedUser.username} has been created`,
    });
    navigate(`/admin/users/${savedUser.id}`);
  };

  return (
    <Stack>
      <Title>New user</Title>
      <UserForm allRoles={allRoles} onSubmit={onSubmit} />
    </Stack>
  );
}
