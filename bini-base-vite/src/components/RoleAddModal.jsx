import {
  Button,
  FocusTrap,
  Group,
  Modal,
  Stack,
  TextInput,
} from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import { useQueryClient } from "react-query";
import { useSaveRole } from "../api/role-api.js";

export default function RoleAddModal({ opened, close }) {
  const queryClient = useQueryClient();
  const createRole = useSaveRole(queryClient);

  const submitRoleForm = () => {
    return form.onSubmit(async (values) => {
      await createRole.mutateAsync(values);
      closeModal();
    });
  };

  const closeModal = () => {
    form.reset();
    close();
  };

  const form = useForm({
    initialValues: {
      code: "",
      label: "",
    },
    validate: {
      code: hasLength({ min: 3, max: 10 }),
      label: hasLength({ min: 3, max: 50 }),
    },
  });

  return (
    <Modal opened={opened} onClose={closeModal} title="Create a role">
      <form onSubmit={submitRoleForm()}>
        <Stack>
          <FocusTrap>
            <TextInput
              data-autofocus
              withAsterisk
              label="Code"
              placeholder="USER"
              onInput={(event) => {
                event.target.value = event.target.value.toUpperCase();
              }}
              maxLength="10"
              {...form.getInputProps("code")}
            />
            <TextInput
              withAsterisk
              label="Label"
              placeholder="Utilisateur"
              {...form.getInputProps("label")}
            />
            <Group position="right" mt="md">
              <Button type="submit">Save</Button>
            </Group>
          </FocusTrap>
        </Stack>
      </form>
    </Modal>
  );
}
