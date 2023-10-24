import { ActionIcon, Button, Group, Stack, Text, Title } from "@mantine/core";
import { useDeleteRole, useDeleteRoles, useRoles } from "../api/role-api.js";
import { useDisclosure } from "@mantine/hooks";
import RoleAddModal from "./RoleAddModal.jsx";
import { useQueryClient } from "react-query";
import { IconTrash } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { useState } from "react";
import PagedTable from "./ui/PagedTable.jsx";
import { useNavigate } from "react-router-dom";

export default function Roles() {
  const navigate = useNavigate();

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

  const columns = [
    {
      accessor: "code",
      title: "Code",
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
          <ActionIcon
            onClick={(e) => {
              e.stopPropagation();
              openDeleteRoleModal(role);
            }}
          >
            <IconTrash size={18} />
          </ActionIcon>
        </Group>
      ),
    },
  ];

  return (
    <div>
      <Stack>
        <Title>Roles management</Title>

        <PagedTable
          columns={columns}
          getQuery={useRoles}
          selectedRecords={selectedRecords}
          setSelectedRecords={setSelectedRecords}
          onRowClick={(item) => navigate(`/admin/roles/${item.id}`)}
        />
        <Group>
          <Button
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan" }}
            onClick={openAddRoleModal}
          >
            Create a Role
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
        <RoleAddModal opened={addRoleModalOpened} close={closeAddRoleModal} />
      </Stack>
    </div>
  );
}
