import { DataTable } from "mantine-datatable";
import { ActionIcon, Button, Group, Stack, Text, Title } from "@mantine/core";
import { useDeleteRole, useDeleteRoles, useRoles } from "../api/role-api.js";
import { useDisclosure } from "@mantine/hooks";
import AddRoleModal from "./AddRoleModal.jsx";
import { useQueryClient } from "react-query";
import { IconTrash } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Roles() {
  const { data: roles, status } = useRoles();
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [
    addRoleModalOpened,
    { open: openAddRoleModal, close: closeAddRoleModal },
  ] = useDisclosure(false);

  const queryClient = useQueryClient();
  const deleteRole = useDeleteRole(queryClient);
  const deleteRoles = useDeleteRoles(queryClient);
  const openDeleteRoleModal = (role) =>
    modals.openConfirmModal({
      title: "Please confirm your action",
      children: (
        <Text size="sm">
          Please confirm that you want to delete the role with code {role.code}
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onConfirm: () => deleteRole.mutate(role.id),
    });

  const openDeleteRolesModal = () => {
    modals.openConfirmModal({
      title: "Please confirm your action",
      children: (
        <Text size="sm">
          Please confirm that you want to delete the following roles:{" "}
          {selectedRecords.map((role) => role.code).join(", ")}
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onConfirm: () => {
        deleteRoles.mutate(selectedRecords.map((role) => role.id));
        setSelectedRecords([]);
      },
    });
  };

  return (
    <div>
      <Stack>
        <Title>Roles management</Title>

        <DataTable
          fetching={status === "loading"}
          loaderBackgroundBlur={3}
          withBorder
          borderRadius="sm"
          striped
          noRecordsText="No users found"
          minHeight={roles && roles.length === 0 ? 150 : 0}
          highlightOnHover
          records={roles}
          selectedRecords={selectedRecords}
          onSelectedRecordsChange={setSelectedRecords}
          columns={[
            {
              accessor: "code",
              title: "Code",
              render: ({ id, code }) => (
                <Link to={`/admin/roles/${id}`}>{code}</Link>
              ),
              width: 150,
            },
            {
              accessor: "label",
              title: "Label",
            },
            {
              accessor: "actions",
              title: "",
              textAlignment: "right",
              render: (role) => (
                <Group spacing="4" position="right" noWrap>
                  <ActionIcon onClick={() => openDeleteRoleModal(role)}>
                    <IconTrash size={18} />
                  </ActionIcon>
                </Group>
              ),
            },
          ]}
        />
        <Group>
          <Button
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan" }}
            onClick={openAddRoleModal}
          >
            Add role
          </Button>
          <Button
            variant="gradient"
            gradient={{ from: "orange", to: "red" }}
            onClick={openDeleteRolesModal}
            disabled={selectedRecords.length === 0}
          >
            Delete selection
          </Button>
        </Group>
        <AddRoleModal opened={addRoleModalOpened} close={closeAddRoleModal} />
      </Stack>
    </div>
  );
}
