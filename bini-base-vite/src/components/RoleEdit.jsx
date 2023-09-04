import { Link, useParams } from "react-router-dom";
import { useRole, useSaveRole } from "../api/role-api.js";
import { useQueryClient } from "react-query";
import { hasLength, useForm } from "@mantine/form";
import {
  Button,
  FocusTrap,
  Group,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";

export default function RoleEdit() {
  const { roleId } = useParams();
  const { data: role } = useRole(roleId);
  const queryClient = useQueryClient();
  const saveRole = useSaveRole(queryClient);

  return (
    <Stack>
      <Title>Edit role</Title>
      {role && <RoleForm role={role} saveRole={saveRole} />}
    </Stack>
  );
}

const RoleForm = ({ role, saveRole }) => {
  const form = useForm({
    initialValues: {
      code: role.code,
      label: role.label,
    },
    validate: {
      code: hasLength({ min: 3, max: 10 }),
      label: hasLength({ min: 3, max: 50 }),
    },
  });

  const submitRoleForm = () => {
    return form.onSubmit(async (values) => {
      await saveRole.mutateAsync({ id: role.id, ...values });
      notifications.show({
        title: "Role saved",
        message: `Role ${role.code} has been saved`,
      });
    });
  };

  return (
    <form onSubmit={submitRoleForm()}>
      <FocusTrap>
        <Stack>
          <TextInput
            data-autofocus
            label="Code"
            readOnly
            disabled
            {...form.getInputProps("code")}
          />
          <TextInput
            data-autofocus
            label="Label"
            {...form.getInputProps("label")}
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
              to="/admin/roles"
            >
              Back
            </Button>
          </Group>
        </Stack>
      </FocusTrap>
    </form>
  );
};
