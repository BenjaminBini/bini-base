import {
  ActionIcon,
  Button,
  Group,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import { Link } from "react-router-dom";
import AutocompleteInput from "./ui/AutocompleteInput.jsx";
import { useFindUsersByUserName } from "../api/user-api.js";
import { IconPlus, IconTrash, IconUser } from "@tabler/icons-react";
import { forwardRef } from "react";
import { DataTable } from "mantine-datatable";
import { useDisclosure } from "@mantine/hooks";
import PlayerAddModal from "./PlayerAddModal.jsx";
import { modals } from "@mantine/modals";
import { useQueryClient } from "react-query";
import { useDeletePlayer } from "../api/player-api.js";

export default function TeamForm({ team, onSubmit }) {
  const [
    addPlayerModalOpened,
    { open: openAddPlayerModal, close: closeAddPlayerModal },
  ] = useDisclosure(false);

  const queryClient = useQueryClient();
  const deletePlayer = useDeletePlayer(queryClient);

  const openDeletePlayerModal = (player) =>
    modals.openConfirmModal({
      title: "Please confirm your action",
      children: (
        <Text size="sm">
          Please confirm that you want to delete the player {player.name}
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onConfirm: () => deletePlayer.mutate(player.id),
    });

  const form = useForm({
    initialValues: {
      label: team?.label || "",
      owner: {
        id: team?.owner?.id || null,
      },
    },
    validate: {
      label: hasLength({ min: 3, max: 50 }),
    },
  });

  const submit = (values) => {
    onSubmit({ ...values });
  };

  return (
    <>
      <form onSubmit={form.onSubmit(submit)}>
        <Stack>
          <TextInput
            withAsterisk
            label="Label"
            {...form.getInputProps("label")}
          />
          <AutocompleteInput
            icon={<IconUser size={18} />}
            label="Owner"
            useQuery={useFindUsersByUserName}
            initialItem={team?.owner || null}
            initialValue={team?.owner?.id || ""}
            initialLabel={team?.owner?.username || ""}
            valueField="id"
            labelField="username"
            formFieldId="owner.id"
            placeholder="Search for a user"
            form={form}
            itemComponent={UserSelectItem}
          />

          {team && (
            <>
              <Title order={5}>Players</Title>
              <DataTable
                withBorder
                borderRadius="sm"
                striped
                noRecordsText="No player yet"
                minHeight={team.players.length === 0 ? 150 : 0}
                records={team.players}
                columns={[
                  {
                    accessor: "name",
                    title: "Name",
                  },
                  {
                    accessor: "actions",
                    title: "",
                    textAlignment: "right",
                    render: (player) => (
                      <Group spacing="4" position="right" noWrap>
                        <ActionIcon
                          onClick={() => openDeletePlayerModal(player)}
                        >
                          <IconTrash size={18} />
                        </ActionIcon>
                      </Group>
                    ),
                  },
                ]}
              />
              <Group>
                <Button
                  size="xs"
                  variant="gradient"
                  gradient={{ from: "indigo", to: "cyan" }}
                  leftIcon={<IconPlus></IconPlus>}
                  onClick={openAddPlayerModal}
                >
                  Add a player
                </Button>
              </Group>
            </>
          )}

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
              to="/admin/teams"
            >
              Back
            </Button>
          </Group>
        </Stack>
      </form>
      <PlayerAddModal
        opened={addPlayerModalOpened}
        close={closeAddPlayerModal}
        teamId={team?.id}
      />
    </>
  );
}

const UserSelectItem = forwardRef(
  ({ username, email, createdDate, modifiedDate, ...props }, ref) => (
    <div ref={ref} {...props}>
      <Group noWrap>
        <Text size="sm">{username}</Text>
        <Text size="xs" opacity={0.65}>
          {email}
        </Text>
      </Group>
    </div>
  ),
);
