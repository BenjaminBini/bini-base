import { Stack, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { useSaveTeam } from "../api/teams-api.js";
import TeamForm from "./TeamForm.jsx";

export default function TeamNew() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const saveTeam = useSaveTeam(queryClient);

  const onSubmit = async (team) => {
    const savedTeam = await saveTeam.mutateAsync(team);
    notifications.show({
      title: "Team created",
      message: `Team ${team.name} has been created`,
    });
    navigate(`/admin/teams/${savedTeam.id}`);
  };

  return (
    <Stack>
      <Title>New Team</Title>
      <TeamForm onSubmit={onSubmit} />
    </Stack>
  );
}
