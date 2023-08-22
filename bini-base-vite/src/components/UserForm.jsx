import {
  Button,
  Group,
  PasswordInput,
  Stack,
  TextInput,
  TransferList,
} from "@mantine/core";
import { hasLength, isEmail, useForm } from "@mantine/form";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function UserForm({ user, allRoles, onSubmit }) {
  const [userRoles, setUserRoles] = useState(
    user
      ? [
          [...allRoles].filter(
            (role) =>
              user.roles.filter((userRole) => role.value === userRole.code)
                .length === 1,
          ),
          [...allRoles].filter(
            (role) =>
              user.roles.filter((userRole) => role.value === userRole.code)
                .length === 0,
          ),
        ]
      : [[], allRoles],
  );

  const form = useForm({
    initialValues: {
      username: user?.username || "",
      email: user?.email || "",
      password: "",
    },
    validate: {
      username: hasLength({ min: 3, max: 50 }),
      email: isEmail(),
    },
  });

  const submit = (values) => {
    onSubmit({ ...values, roles: userRoles[0] });
  };

  return (
    <form onSubmit={form.onSubmit(submit)}>
      <Stack>
        {user && <TextInput label="ID" value={user.id} disabled />}
        <TextInput
          data-autofocus
          withAsterisk
          label="Username"
          {...form.getInputProps("username")}
        />
        <TextInput
          withAsterisk
          label="Email"
          {...form.getInputProps("email")}
        />
        <PasswordInput
          withAsterisk
          label="Password"
          {...form.getInputProps("password")}
        />
        <TransferList
          value={userRoles}
          onChange={setUserRoles}
          titles={["User roles", "Available roles"]}
          searchPlaceholder="Search..."
          nothingFound="No results"
        />
        <Group position="left" mt="md">
          <Button
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan" }}
            type="submit"
          >
            Save
          </Button>
          <Button
            variant="outline"
            type="submit"
            component={Link}
            to="/admin/users"
          >
            Cancel
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
