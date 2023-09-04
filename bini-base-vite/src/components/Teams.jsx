import {
  ActionIcon,
  Box,
  Button,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconTrash } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { useQueryClient } from "react-query";
import { useDeleteTeam, useDeleteTeams, useTeams } from "../api/teams-api.js";
import PagedTable from "./ui/PagedTable.jsx";

export default function Teams() {
  const navigate = useNavigate();
  const [selectedRecords, setSelectedRecords] = useState([]);

  const queryClient = useQueryClient();

  const deleteTeam = useDeleteTeam(queryClient);
  const deleteTeams = useDeleteTeams(queryClient);

  const openDeleteTeamModal = (team) =>
    modals.openConfirmModal({
      title: "Please confirm your action",
      children: (
        <Text size="sm">
          Please confirm that you want to delete the team {team.label}
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onConfirm: () => deleteTeam.mutate(team.id),
    });

  const openDeleteTeamsModal = () => {
    modals.openConfirmModal({
      title: "Please confirm your action",
      children: (
        <Text size="sm">
          Please confirm that you want to delete the following teams:{" "}
          {selectedRecords.map((team) => team.label).join(", ")}
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onConfirm: () => {
        deleteTeams.mutate(selectedRecords.map((team) => team.id));
        setSelectedRecords([]);
      },
    });
  };

  const columns = [
    {
      accessor: "label",
      title: "Label",
      render: ({ id, label }) => {
        return <Link to={`/admin/teams/${id}`}>{label}</Link>;
      },
    },
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
          <ActionIcon onClick={() => openDeleteTeamModal(user)}>
            <IconTrash size={18} />
          </ActionIcon>
        </Group>
      ),
    },
  ];

  return (
    <Stack>
      <Box>
        <Title>Teams management</Title>
      </Box>

      <PagedTable
        columns={columns}
        getQuery={useTeams}
        selectedRecords={selectedRecords}
        setSelectedRecords={setSelectedRecords}
      />
      <Group position="left">
        <Button
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan" }}
          onClick={() => navigate("/admin/teams/new")}
        >
          Create a Team
        </Button>
        <Button
          variant="gradient"
          gradient={{ from: "orange", to: "red" }}
          onClick={openDeleteTeamsModal}
          disabled={selectedRecords.length === 0}
        >
          Delete selection
        </Button>
      </Group>
    </Stack>
  );
}
