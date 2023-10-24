import {
  ActionIcon,
  Box,
  Button,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useDeleteUser, useDeleteUsers, useUsers } from "../api/user-api.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconTrash } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { useQueryClient } from "react-query";
import PagedTable from "./ui/PagedTable.jsx";

export default function Users() {
  const navigate = useNavigate();
  const [selectedRecords, setSelectedRecords] = useState([]);
  const queryClient = useQueryClient();
  const deleteUser = useDeleteUser(queryClient);
  const deleteUsers = useDeleteUsers(queryClient);

  const openDeleteUserModal = (user) =>
    modals.openConfirmModal({
      title: "Please confirm your action",
      children: (
        <Text size="sm">
          Please confirm that you want to delete the user {user.username}
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onConfirm: () => deleteUser.mutate(user.id),
    });

  const openDeleteUsersModal = () => {
    modals.openConfirmModal({
      title: "Please confirm your action",
      children: (
        <Text size="sm">
          Please confirm that you want to delete the following users:{" "}
          {selectedRecords.map((user) => user.username).join(", ")}
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onConfirm: () => {
        deleteUsers.mutate(selectedRecords.map((user) => user.id));
        setSelectedRecords([]);
      },
    });
  };

  const columns = [
    {
      accessor: "id",
      title: "#",
      textAlignment: "right",
      width: 60,
    },
    {
      accessor: "username",
      title: "Username",
      render: ({ username }) => {
        return <Text fw={700}>{username}</Text>;
      },
    },
    { accessor: "email", title: "Email" },
    {
      accessor: "createdDate",
      title: "Created",
      render: ({ createdDate }) => {
        return new Date(createdDate).toLocaleDateString();
      },
    },
    {
      accessor: "modifiedDate",
      title: "Modified",
      render: ({ modifiedDate }) => {
        return new Date(modifiedDate).toLocaleDateString();
      },
    },
    {
      accessor: "actions",
      title: "",
      textAlignment: "right",
      render: (user) => (
        <Group spacing="4" position="right" noWrap>
          <ActionIcon
            onClick={(e) => {
              e.stopPropagation();
              openDeleteUserModal(user);
            }}
          >
            <IconTrash size={18} />
          </ActionIcon>
        </Group>
      ),
    },
  ];
  return (
    <Stack>
      <Box>
        <Title>Users management</Title>
      </Box>

      <PagedTable
        columns={columns}
        getQuery={useUsers}
        selectedRecords={selectedRecords}
        setSelectedRecords={setSelectedRecords}
        onRowClick={(item) => navigate(`/admin/users/${item.id}`)}
      />

      <Group position="left">
        <Button
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan" }}
          onClick={() => navigate("/admin/users/new")}
        >
          New
        </Button>
        <Button
          variant="gradient"
          gradient={{ from: "orange", to: "red" }}
          onClick={openDeleteUsersModal}
          disabled={selectedRecords.length === 0}
        >
          Delete selection
        </Button>
      </Group>
    </Stack>
  );
}
