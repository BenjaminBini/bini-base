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
import { useSavePlayer } from "../api/player-api.js";

export default function PlayerAddModal({ opened, close, teamId }) {
  const queryClient = useQueryClient();
  const createPlayer = useSavePlayer(queryClient);

  const submitPlayerForm = () => {
    return form.onSubmit(async (values) => {
      await createPlayer.mutateAsync(values);
      closeModal();
    });
  };

  const closeModal = () => {
    form.reset();
    close();
  };

  const form = useForm({
    initialValues: {
      name: "",
      team: {
        id: teamId,
      },
    },
    validate: {
      name: hasLength({ min: 3, max: 10 }),
    },
  });

  return (
    <Modal opened={opened} onClose={closeModal} title="Create a player">
      <form onSubmit={submitPlayerForm()}>
        <Stack>
          <FocusTrap>
            <TextInput
              data-autofocus
              withAsterisk
              label="Name"
              maxLength="20"
              {...form.getInputProps("name")}
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
